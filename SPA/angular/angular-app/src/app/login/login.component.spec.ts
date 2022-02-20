import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { LoginComponent } from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent,AppComponent],
      providers: [AuthService,TokenStorageService],
      imports:[HttpClientModule,
        FormsModule,
        ReactiveFormsModule,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.onSubmit();
    fixture.detectChanges();
  });

  it('should create', () => {
    const fix=TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fix.debugElement.nativeElement;
    expect(component).toBeTruthy();
  });
});
