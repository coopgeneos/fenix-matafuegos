import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtinguisherTypeListComponent } from './extinguisher-type-list.component';

describe('ExtinguisherTypeListComponent', () => {
  let component: ExtinguisherTypeListComponent;
  let fixture: ComponentFixture<ExtinguisherTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtinguisherTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtinguisherTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
