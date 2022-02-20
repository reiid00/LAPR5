import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosComponent } from './pedidos.component';
import {HttpClientModule} from '@angular/common/http';

describe('PedidosComponent', () => {
  let component: PedidosComponent;
  let fixture: ComponentFixture<PedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosComponent ],
      imports: [ HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
