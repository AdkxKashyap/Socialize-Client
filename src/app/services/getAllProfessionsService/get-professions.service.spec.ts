import { TestBed } from '@angular/core/testing';

import { GetProfessionsService } from './get-professions.service';

describe('GetProfessionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetProfessionsService = TestBed.get(GetProfessionsService);
    expect(service).toBeTruthy();
  });
});
