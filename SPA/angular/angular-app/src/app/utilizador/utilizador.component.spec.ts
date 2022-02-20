import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadorComponent } from './utilizador.component';
import {HttpClientModule} from '@angular/common/http';

describe('UtilizadorComponent', () => {
  let component: UtilizadorComponent;
  let fixture: ComponentFixture<UtilizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizadorComponent ],
      imports:[HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
