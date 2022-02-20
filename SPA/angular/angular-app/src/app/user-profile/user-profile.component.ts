import { Component, Input, OnInit } from '@angular/core';
import { UtilizadorService } from '../_services/utilizador.service';
import { Utilizador } from '../utilizador';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: Utilizador;

  @Input()
  id: string;

  constructor(private userService: UtilizadorService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");

    this.userService.getUtilizadorByID(this.id).subscribe(data => {
      console.log(data); // should be your user.
      this.user = data;
  
  }, error => {
      console.log(error); // if api returns and error you will get it here  
      }); 
  }

}
