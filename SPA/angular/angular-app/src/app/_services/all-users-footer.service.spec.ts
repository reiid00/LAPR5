import { TestBed } from '@angular/core/testing';

import { AllUsersFooterService } from './all-users-footer.service';

describe('AllUsersFooterService', () => {
  let service: AllUsersFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllUsersFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
