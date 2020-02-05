import { TestBed } from '@angular/core/testing';

import { GetUserAuthProviderService } from './get-user-auth-provider.service';

describe('GetUserAuthProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserAuthProviderService = TestBed.get(GetUserAuthProviderService);
    expect(service).toBeTruthy();
  });
});
