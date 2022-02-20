import { TestBed } from '@angular/core/testing';

import { GraphInfoService } from './graph-info.service';

describe('GraphInfoService', () => {
  let service: GraphInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
