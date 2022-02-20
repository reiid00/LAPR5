import { TestBed } from '@angular/core/testing';

import { EstadohumorService } from './estadohumor.service';
import {HttpClientModule, HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstadoHumor } from '../estado-humor';
import { of } from 'rxjs';


describe('EstadohumorService Testing -- HttpClient Tests', () => {
  let service: EstadohumorService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;
  const fakeEstadosHumor: EstadoHumor[]=
      [{id:"1234", nome:"Triste", icon:"myIcon", descricaoEstadoHumor:"myDescricao"},{id:"4321", nome:"Contente", icon:"myIcon", descricaoEstadoHumor:"myDescricao"}];


  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule, HttpClientTestingModule ]});

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    const fakeEstadosHumor: EstadoHumor[]=
      [{id:"1234", nome:"Triste", icon:"myIcon", descricaoEstadoHumor:"myDescricao"},{id:"4321", nome:"Contente", icon:"myIcon", descricaoEstadoHumor:"myDescricao"}];

    service= new EstadohumorService(httpClientSpy);
  });

  it('should return expected list of estados humor', (done: DoneFn) => {
    
    httpClientSpy.get.and.returnValue(of(fakeEstadosHumor));

    service.getEstadosHumor().subscribe({
      next: estados=>{
              expect(estados).toBe(fakeEstadosHumor);
              done();
            },
      error: error=>{console.error; done.fail(); }
     } );
    
    });

    it('should return expected estados humor', (done: DoneFn) => {
    
      httpClientSpy.get.and.returnValue(of(fakeEstadosHumor[0]));
  
      service.getEstadoHumorByID(fakeEstadosHumor[0].id).subscribe({
        next: estados=>{
                expect(estados).toBe(fakeEstadosHumor[0]);
                done();
              },
        error: error=>{console.error; done.fail(); }
       } );
      
      });
  

    it('should create a new estado humor', (done: DoneFn)=>{

      var newEstadoHumor={id:"452", nome:"Alegre", icon:"myIcon", descricaoEstadoHumor:"myDescricao"} as EstadoHumor;


      httpClientSpy.post.and.returnValue(of(newEstadoHumor));

      service.postEstadoHumor(newEstadoHumor.nome, newEstadoHumor.icon, newEstadoHumor.descricaoEstadoHumor).subscribe(
        {
          next: estado=>{
            expect(estado.nome).toBe(newEstadoHumor.nome); 
            expect(estado.icon).toBe(newEstadoHumor.icon); 
            expect(estado.descricaoEstadoHumor).toBe(newEstadoHumor.descricaoEstadoHumor);

            done();
          },
          error: estado=>{console.error(); done.fail();}
        }
      );

    }
    );

    it('should update a estado humor', (done: DoneFn)=>{

      var estadoHumor=fakeEstadosHumor[0];
      estadoHumor.nome="Updated Nome";


      httpClientSpy.put.and.returnValue(of(estadoHumor));

      service.putEstadoHumor(estadoHumor.id,estadoHumor.nome, estadoHumor.icon, estadoHumor.descricaoEstadoHumor).subscribe(
        {
          next: estado=>{
            expect(estado.id).toBe(estadoHumor.id);
            expect(estado.nome).toBe(estadoHumor.nome);
            expect(estado.icon).toBe(estadoHumor.icon);
            expect(estado.descricaoEstadoHumor).toBe(estadoHumor.descricaoEstadoHumor);

            done();
          },
          error: estado=>{console.error(); done.fail();}
        }
      );

    } );

    it('should delete a estado humor', (done: DoneFn)=>{

      var estadoHumor=fakeEstadosHumor[0];
      estadoHumor.nome="Updated Nome";


      httpClientSpy.delete.and.returnValue(of(estadoHumor));

      service.deleteEstadoHumor(estadoHumor.id).subscribe(
        {
          next: estado=>{
            expect(estado.id).toBe(estadoHumor.id);
      
            done();
          },
          error: estado=>{console.error(); done.fail();}
        }
      );

    } );
});
