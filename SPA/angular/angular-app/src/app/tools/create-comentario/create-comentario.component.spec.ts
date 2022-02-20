import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComentarioComponent } from './create-comentario.component';

describe('CreateComentarioComponent', () => {
  let component: CreateComentarioComponent;
  let fixture: ComponentFixture<CreateComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
