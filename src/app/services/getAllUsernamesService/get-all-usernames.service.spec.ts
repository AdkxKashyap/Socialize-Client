import { TestBed } from '@angular/core/testing';

import { GetAllUsernamesService } from './get-all-usernames.service';

describe('GetAllUsernamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllUsernamesService = TestBed.get(GetAllUsernamesService);
    expect(service).toBeTruthy();
  });
});
