import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { BaseServiceAPI } from '../base-service-api';
import { Condition } from '../directives/filterable.directive';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent<T> implements OnInit {

  @Input() service: BaseServiceAPI<T>
  @Input() key: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() inputPlaceholder: string;
  @Output() selectChange = new EventEmitter<any>();

  selected: any = null;
  inputValue: string = null;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.placeholder = this.placeholder ? this.placeholder : "Select";
    this.inputPlaceholder = this.inputPlaceholder ? this.inputPlaceholder : "Write for filter"
    this.search();
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
    this.selectChange.emit(value ? value : null);
  }

  cleanSearch(isOpen: any) {
    if(!isOpen) {
      this.searchElement(null);
    }
    this.inputValue = null;
  }

  @Input()
  set clean(flag: boolean) {
    if(flag && flag == true) {
      this.cleanSearch(false);
      this.selected = null;
    }  
  }
}
