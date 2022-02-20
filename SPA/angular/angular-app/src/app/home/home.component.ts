import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from '../_services/utilizador.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private utilizadorService: UtilizadorService) { }

  ngOnInit(): void {
    /*this.utilizadorService.({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });*/
  }
}