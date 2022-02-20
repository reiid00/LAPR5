import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UtilizadorService } from '../_services/utilizador.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  hide : boolean = true;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private utilizadorService: UtilizadorService) { }

  ngOnInit(): void {
    
   if (this.tokenStorage.getToken()!=null) {
    console.log(this.tokenStorage.getToken());
      this.isLoggedIn = true;
      
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.utilizadorService.login(email, password).subscribe({
      next: data => {
        
        this.tokenStorage.saveToken(data.id);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  reloadPage(): void {
    window.location.reload();
  }

  togglemyPasswordFieldType(){
    this.hide = !this.hide;
  }
}