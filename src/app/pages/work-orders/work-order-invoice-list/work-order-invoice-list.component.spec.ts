import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderInvoiceListComponent } from './work-order-invoice-list.component';

describe('WorkOrderInvoiceListComponent', () => {
  let component: WorkOrderInvoiceListComponent;
  let fixture: ComponentFixture<WorkOrderInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
