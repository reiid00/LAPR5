import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoUserInterComponent } from './pedido-user-inter.component';

describe('PedidoUserInterComponent', () => {
  let component: PedidoUserInterComponent;
  let fixture: ComponentFixture<PedidoUserInterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoUserInterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoUserInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
