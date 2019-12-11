import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtinguisherListComponent } from './extinguisher-list.component';

describe('ExtinguisherListComponent', () => {
  let component: ExtinguisherListComponent;
  let fixture: ComponentFixture<ExtinguisherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtinguisherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtinguisherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
