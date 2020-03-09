import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderPrintListComponent } from './work-order-print-list.component';

describe('WorkOrderPrintListComponent', () => {
  let component: WorkOrderPrintListComponent;
  let fixture: ComponentFixture<WorkOrderPrintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderPrintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderPrintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
