import { TestBed } from '@angular/core/testing';

import { ExtinguisherTypeService } from './extinguisher-type.service';

describe('ExtinguisherTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtinguisherTypeService = TestBed.get(ExtinguisherTypeService);
    expect(service).toBeTruthy();
  });
});
