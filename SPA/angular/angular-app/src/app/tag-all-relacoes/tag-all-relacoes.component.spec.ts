import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAllRelacoesComponent } from './tag-all-relacoes.component';

describe('TagAllRelacoesComponent', () => {
  let component: TagAllRelacoesComponent;
  let fixture: ComponentFixture<TagAllRelacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagAllRelacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAllRelacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
