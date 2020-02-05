import { TestBed } from '@angular/core/testing';

import { GetSearchResService } from './get-search-res.service';

describe('GetSearchResService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSearchResService = TestBed.get(GetSearchResService);
    expect(service).toBeTruthy();
  });
});
