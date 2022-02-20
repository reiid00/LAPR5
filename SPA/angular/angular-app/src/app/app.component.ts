import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AllUsersFooterService } from './_services/all-users-footer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  numUtilizadores?:number;
  id: string;
  email?: string;
  nome?: string;

  constructor(private tokenStorageService: TokenStorageService,private allUsersFooterService: AllUsersFooterService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;

      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.nome = user.nome;
      this.id = user.id;
      this.email = user.email;
    }

    this.update();

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  OpenPedidos():void{
    window.open('/pedido');
  }

  pedidos():void{
    
  }

   async update(){
   await this.allUsersFooterService.getUtilizadores();
   console.log(this.numUtilizadores=this.allUsersFooterService.utilizadores.length);
  }
}



