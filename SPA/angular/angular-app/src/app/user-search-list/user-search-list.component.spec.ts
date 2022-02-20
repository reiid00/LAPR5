import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchListComponent } from './user-search-list.component';
import {HttpClientModule} from '@angular/common/http';
import { UtilizadorService } from '../_services/utilizador.service';

describe('UserSearchListComponent', () => {
  let component: UserSearchListComponent;
  let fixture: ComponentFixture<UserSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSearchListComponent ],
      imports: [ HttpClientModule ],
      providers: [UtilizadorService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
