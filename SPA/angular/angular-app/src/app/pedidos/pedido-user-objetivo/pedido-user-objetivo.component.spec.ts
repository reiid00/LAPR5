import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoUserObjetivoComponent } from './pedido-user-objetivo.component';

describe('PedidoUserObjetivoComponent', () => {
  let component: PedidoUserObjetivoComponent;
  let fixture: ComponentFixture<PedidoUserObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoUserObjetivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoUserObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
