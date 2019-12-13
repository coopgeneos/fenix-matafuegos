import { OnSort, SortEvent, NgbdSortableHeader } from 'src/app/commons/directives/sortable.directive';
import { OnFilter, FilterEvent } from 'src/app/commons/directives/filterable.directive';
import { BaseServiceAPI } from './base-service-api';
import { ViewChildren, QueryList } from '@angular/core';

export class BaseListComponent<T> implements OnSort, OnFilter{

  public pagination:number[] = [25,50,100,200,500];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: BaseServiceAPI<T>) { }

  ngOnInit() {
    console.log("iniciando BaseLisComponent")
    //Clear state on init so SHARED services dont keep filtered
    this.service.clearState();
    this.service.search();
  }

  ngOnDestroy() {
    //Clear state on destroy so SHARED services dont keep filtered
    this.service.clearState();
  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.column !== column) {
        header.direction = '';
      }
    });

    this.service.sort = {column,direction};
  }

  onFilter({column, value, condition}: FilterEvent) {
    this.service.filter = {column,value,condition};
  }

}
