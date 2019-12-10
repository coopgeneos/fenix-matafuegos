import {Directive, EventEmitter, Input, Output} from '@angular/core';

type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = {'': 'asc', 'asc': 'desc', 'desc': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

export interface OnSort {
  onSort(event: SortEvent): void;
}



@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() column: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.column, direction: this.direction});
  }
}