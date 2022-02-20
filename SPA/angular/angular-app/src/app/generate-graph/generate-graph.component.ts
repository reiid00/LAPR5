import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Alow-Origin':'+',
    'Authorization':'authKey',
    'userid':'1'
  })
};

@Component({
  selector: 'app-generate-graph',
  templateUrl: './generate-graph.component.html',
  styleUrls: ['./generate-graph.component.css']
})
export class GenerateGraphComponent implements OnInit {

  private readonly urlPlan = 'http://localhost:4300';
  public res: string[]=[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getPath().subscribe(res=>this.res=res);
    this.res.forEach(element => {
      console.log(element);
    });
  }
  
  getPath():Observable<string[]>{
    //hardcoded dados de teste
    var origId = 1;
    var destId = 200;

    const urlAux = this.urlPlan + '/api/CaminhoMaisForte?origId=' + origId+ '&destId=' + destId;
    return this.http.get<string[]>(urlAux,httpOptions);

  }

}
