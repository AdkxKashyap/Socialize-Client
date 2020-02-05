import { TestBed } from '@angular/core/testing';

import { ToLowerCaseService } from './to-lower-case.service';

describe('ToLowerCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToLowerCaseService = TestBed.get(ToLowerCaseService);
    expect(service).toBeTruthy();
  });
});
