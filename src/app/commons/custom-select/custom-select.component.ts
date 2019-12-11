import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() selectChange = new EventEmitter<any>();

  filteredList: T[];
  notSelected: string = null;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.search()
      .then(list => {this.filteredList = list})
      .catch(err => {this._snackBar.open("Error consultando la lista", "Close", { duration: 2000 })});
  }

  searchElement(value: any) {
    this.service.clearState();
    let filters = [];
    if(value && value != "") filters.push({column: this.label, condition: Condition.contains, value: value}); 
    this.service.filters = filters;
    this.service.search()
      .then(list => {this.filteredList = list})
      .catch(err => {this._snackBar.open("Error filtrando la lista", "Close", { duration: 2000 })})
  }

  selectElement(value: any){
    this.selectChange.emit(value);
  }

}
