import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { BaseServiceAPI } from '../base-service-api';
import { Condition, FilterEvent } from '../directives/filterable.directive';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent<T> implements OnInit {

  @Input() service: BaseServiceAPI<T>
  @Input() key: string;
  @Input() label: any;
  @Input() placeholder: string;
  @Input() inputPlaceholder: string;
  @Output() selectChange = new EventEmitter<any>();

  _selected: string = null;
  _inputValue: string = null;
  _force: boolean = false;
  _disabled: boolean = false;
  _filters: FilterEvent[] = [];
  _enableAll: boolean = false;
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.placeholder = this.placeholder ? this.placeholder : "Select";
    this.inputPlaceholder = this.inputPlaceholder ? this.inputPlaceholder : "Write for filter"
    this.search();
  }

  // Esta funcion se debería utilizar en caso de querer que el custom Select
  // muestre un conjunto de atributos y no uno solo.
  // Reemplazar la {{elem[label]}} en el html por {{elementLabel(elem}}
  // En @Input label podria venir un string o un string[]
  elementLabel(elem: any) : string {
    if(typeof this.label == 'string') {
      return elem[this.label.toString()];
    }
    if(typeof this.label == 'object') {
      let r = this.label.reduce((_acum, _label) => {
        return _acum + elem[_label.toString()] + " -"
      }, "");
      return r.substring(0, r.lastIndexOf(" -"));
    }
    return "";
  }

  search() {
    this.service.search()
      .catch(err => {this._snackBar.open("Error consultando la lista", "Close", { duration: 2000 })});
  }

  searchElement(value: any) {
    this.service.clearState();
    let filters = [];
    if(value && value != "") {
      filters.push({column: this.label, condition: Condition.contains, value: value}); 
      this.service.filters = filters;
      this.search();
    }
  }

  selectElement(value: any){
    this._selected = value;
    this.selectChange.emit(value ? value : null);
  }

  // Limpia el inputValue
  cleanSearch(isOpen: any) {
    if(!isOpen) {
      this.searchElement(null);
    }
    this._inputValue = null;
  }

  @Input()
  set clean(flag: boolean) {
    if(flag && flag == true) {
      this.cleanSearch(false);
      this._selected = null;
    }  
  }

  @Input()
  set force(flag: boolean) {
    this._force = flag;
    this._filters.push({column: "force", condition: Condition["="], value: true});
    this.service.filters = this._filters
  }

  @Input()
  set selected(value: any) {
    this._selected = value;
  }

  @Input()
  set disabled(flag: boolean) {
    this._disabled = flag;
  }

  @Input()
  set filters(fs: FilterEvent[]) {
    this._filters = fs;
    if(this._force) 
      this.force = true;
    this.service.filters = fs;
    this.search();
  }

  @Input()
  set enableAll(flag: boolean) {
    this._enableAll = flag;
  }
}
