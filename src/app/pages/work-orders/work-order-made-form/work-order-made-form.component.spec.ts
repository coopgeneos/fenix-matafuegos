import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderMadeFormComponent } from './work-order-made-form.component';

describe('WorkOrderMadeFormComponent', () => {
  let component: WorkOrderMadeFormComponent;
  let fixture: ComponentFixture<WorkOrderMadeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderMadeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderMadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
