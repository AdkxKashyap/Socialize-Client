import { TestBed } from '@angular/core/testing';

import { GetHobbiesService } from './get-hobbies.service';

describe('GetHobbiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetHobbiesService = TestBed.get(GetHobbiesService);
    expect(service).toBeTruthy();
  });
});
