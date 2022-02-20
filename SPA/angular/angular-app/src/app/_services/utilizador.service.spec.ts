import { TestBed } from '@angular/core/testing';

import { UtilizadorService } from './utilizador.service';
import {HttpClientModule} from '@angular/common/http';

describe('UtilizadorService', () => {
  let service: UtilizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientModule]});
    service = TestBed.inject(UtilizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
