import { TestBed } from '@angular/core/testing';

import { CustomSnackService } from './custom-snack.service';

describe('CustomSnackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomSnackService = TestBed.get(CustomSnackService);
    expect(service).toBeTruthy();
  });
});
