import { TestBed } from '@angular/core/testing';

import { SendFriendRequestService } from './send-friend-request.service';

describe('SendFriendRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendFriendRequestService = TestBed.get(SendFriendRequestService);
    expect(service).toBeTruthy();
  });
});
