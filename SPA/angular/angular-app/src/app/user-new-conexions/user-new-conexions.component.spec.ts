import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewConexionsComponent } from './user-new-conexions.component';

describe('UserNewConexionsComponent', () => {
  let component: UserNewConexionsComponent;
  let fixture: ComponentFixture<UserNewConexionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewConexionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewConexionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
