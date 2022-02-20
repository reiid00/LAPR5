import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsProprioComponent } from './tags-proprio.component';

describe('TagsProprioComponent', () => {
  let component: TagsProprioComponent;
  let fixture: ComponentFixture<TagsProprioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsProprioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsProprioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
