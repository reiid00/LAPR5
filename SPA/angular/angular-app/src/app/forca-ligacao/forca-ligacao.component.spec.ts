import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcaLigacaoComponent } from './forca-ligacao.component';

describe('ForcaLigacaoComponent', () => {
  let component: ForcaLigacaoComponent;
  let fixture: ComponentFixture<ForcaLigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcaLigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcaLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
