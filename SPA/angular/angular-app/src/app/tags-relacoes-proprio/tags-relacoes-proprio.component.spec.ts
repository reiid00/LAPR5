import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsRelacoesProprioComponent } from './tags-relacoes-proprio.component';

describe('TagsRelacoesProprioComponent', () => {
  let component: TagsRelacoesProprioComponent;
  let fixture: ComponentFixture<TagsRelacoesProprioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsRelacoesProprioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsRelacoesProprioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
