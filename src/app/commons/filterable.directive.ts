import {Directive, EventEmitter, Input, Output, OnInit, ViewContainerRef, TemplateRef, ElementRef, Renderer2} from '@angular/core';

export enum Condition {
  "=" = "=",
  "!=" = "!",
  "<" = "<",
  "<=" = "<=",
  ">" = ">",
  ">=" = ">=",
  "like" = "like",
  "contains" = "contains",
  "startsWith" = "startsWith",
  "endsWith" = "endsWith",
  "or" = "or",
  "between" = "between"
}
export interface FilterEvent {
  column: string;
  value: any;
  condition: Condition;
}

interface SelectOption {
  name: string;
  value: string;
}

export interface OnFilter {
  onFilter(filterEvent: FilterEvent) : void;
}

@Directive({
  selector: 'th[filterable]',
  host: {
    '[class.filtering]': 'value !== ""',
    '(input)': 'onChange($event)'
  }
})
export class NgbdFilterableHeader implements OnInit {
  
  @Input() column: string;
  @Input() type: string;
  @Input() condition: Condition;
  @Input() options: SelectOption[];
  @Output() filter = new EventEmitter<FilterEvent>();
  
  constructor(private elementRef: ElementRef, private renderer :Renderer2) { }
  
  onChange($event:any) {
    let value = $event.target.value;
    this.filter.emit({column: this.column, value: value, condition: this.condition});
  }

  ngOnInit(): void {
    if (this.type=="yes_no")
      return this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', `<select class="form-control" ><option value="">--</option><option value="1">Si</option><option value="0">No</option></select>`);
    if (this.type=="select" && this.options ){
      this.condition = Condition["="];
      //build options filter
      let options = '';
      for (let i = 0 ; i < this.options.length ; i++)
        options+= `<option value="${this.options[i].value}">${this.options[i].name}</option>`;
      
      return this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', `<select class="form-control" >${options}</select>`);
    }

    return this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', `<input class="form-control" type="text" />`);

  }

}