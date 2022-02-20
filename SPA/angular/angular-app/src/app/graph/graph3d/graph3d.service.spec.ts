import { TestBed } from '@angular/core/testing';

import { Graph3dService } from './graph3d.service';

describe('Graph3dService', () => {
  let service: Graph3dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Graph3dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
