import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComentariosComponent } from './view-comentarios.component';

describe('ViewComentariosComponent', () => {
  let component: ViewComentariosComponent;
  let fixture: ComponentFixture<ViewComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
