import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostsFeedComponent } from './search-posts-feed.component';

describe('SearchPostsFeedComponent', () => {
  let component: SearchPostsFeedComponent;
  let fixture: ComponentFixture<SearchPostsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPostsFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
