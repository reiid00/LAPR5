import { TestBed } from '@angular/core/testing';

import { UserNewConexionsService } from './user-new-conexions.service';

describe('UserNewConexionsService', () => {
  let service: UserNewConexionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNewConexionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
