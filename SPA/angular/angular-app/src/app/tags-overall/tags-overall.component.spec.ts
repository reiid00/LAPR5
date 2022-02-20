import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsOverallComponent } from './tags-overall.component';

describe('TagsOverallComponent', () => {
  let component: TagsOverallComponent;
  let fixture: ComponentFixture<TagsOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsOverallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
