import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensaoRedeComponent } from './dimensao-rede.component';

describe('DimensaoRedeComponent', () => {
  let component: DimensaoRedeComponent;
  let fixture: ComponentFixture<DimensaoRedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensaoRedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensaoRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
