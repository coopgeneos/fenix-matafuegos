import { TestBed } from '@angular/core/testing';

import { ExtinguishersService } from './extinguisher.service';

describe('ExtinguishersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtinguishersService = TestBed.get(ExtinguishersService);
    expect(service).toBeTruthy();
  });
});
