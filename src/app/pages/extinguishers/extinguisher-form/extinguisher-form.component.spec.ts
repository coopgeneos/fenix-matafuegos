import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtinguisherFormComponent } from './extinguisher-form.component';

describe('ExtinguisherFormComponent', () => {
  let component: ExtinguisherFormComponent;
  let fixture: ComponentFixture<ExtinguisherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtinguisherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtinguisherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
