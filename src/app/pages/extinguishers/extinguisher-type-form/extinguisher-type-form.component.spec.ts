import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtinguisherTypeFormComponent } from './extinguisher-type-form.component';

describe('ExtinguisherTypeFormComponent', () => {
  let component: ExtinguisherTypeFormComponent;
  let fixture: ComponentFixture<ExtinguisherTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtinguisherTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtinguisherTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
