import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudAllUsersComponent } from './tag-cloud-all-users.component';

describe('TagCloudAllUsersComponent', () => {
  let component: TagCloudAllUsersComponent;
  let fixture: ComponentFixture<TagCloudAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudAllUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
