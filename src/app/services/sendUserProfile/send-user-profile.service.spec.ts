import { TestBed } from '@angular/core/testing';

import { SendUserProfileService } from './send-user-profile.service';

describe('SendUserProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendUserProfileService = TestBed.get(SendUserProfileService);
    expect(service).toBeTruthy();
  });
});
