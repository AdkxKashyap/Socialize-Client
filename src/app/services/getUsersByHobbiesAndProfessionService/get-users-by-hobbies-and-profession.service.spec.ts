import { TestBed } from '@angular/core/testing';

import { GetUsersByHobbiesAndProfessionService } from './get-users-by-hobbies-and-profession.service';

describe('GetUsersByHobbiesAndProfessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUsersByHobbiesAndProfessionService = TestBed.get(GetUsersByHobbiesAndProfessionService);
    expect(service).toBeTruthy();
  });
});
