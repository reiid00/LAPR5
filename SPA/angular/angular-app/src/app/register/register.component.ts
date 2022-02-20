import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { EstadohumorService } from '../_services/estadohumor.service';
import { EstadoHumor } from '../estado-humor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public eh;
  estadoHumorEscolhidoNome:string;
  estadoHumorEscolhidoId:string;

  estadosHumor: EstadoHumor[];
  selectedEstadoHumor:EstadoHumor;

  hide : boolean = true;

  form: any = {
    nome:null, email:null, dataNascimento:null,password:null,avatar:null,
      cidade:null,pais:null,descricao:null,numTelemovel:null,estadoHumorId:null,Tags:null,isAccept:false
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private estadoHumorService: EstadohumorService) { }

  ngOnInit(): void {
    this.getAllEstadosHumor();
  }

  onSubmit(): void {
    const { nome, email, dataNascimento,password,avatar,
      cidade,pais,descricao,numTelemovel,estadoHumorId,Tags,isAccept } = this.form;

    this.authService.register(nome, email, dataNascimento,password,avatar,
      cidade,pais,descricao,numTelemovel,estadoHumorId,Tags).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  getAllEstadosHumor(){
    this.estadoHumorService.getEstadosHumor().subscribe(value=>this.estadosHumor=value);
  }

  togglemyPasswordFieldType(){
    this.hide = !this.hide;
  }


}
