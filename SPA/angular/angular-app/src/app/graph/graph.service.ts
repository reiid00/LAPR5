import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CriarPedidoComponent} from '../pedidos/criar-pedido/criar-pedido.component'
import { TokenStorageService } from '../_services/token-storage.service';
import { UtilizadorService } from '../_services/utilizador.service';
import { Utilizador } from '../utilizador';
import { RelationService } from '../relation.service';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import {Relation} from '../relation';
import { GraphInfoService } from './graph-info.service';



@Injectable({
  providedIn: 'root'
})
export class GraphService implements OnDestroy  {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer;
  private camera: THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private nodeDiv;
  private nodeLabel;
  
  private positions;
  private colors;
  private linesMesh;
  private numCircles=21;
  private usersPositions:any[];

  private radius=20;
  private thetaI=0;
  
  private nodesCreated:any[]=new Array();
 
  private currentUser:Utilizador;
  private userInformation:Utilizador[];
  private relacoes:[Relation];

  private frameId: number = null;

  public constructor(private ngZone: NgZone, private token: TokenStorageService,   
                      private utilizadorService : UtilizadorService, private relationsService:RelationService, private graphInfoService: GraphInfoService
                      ) {
  }

  public buildBasicScene(utilizador:Utilizador, userInformation:Utilizador[], relacoes:[Relation], canvas: ElementRef<HTMLCanvasElement>, ){

    this.currentUser=utilizador;
    this.userInformation=userInformation;
    this.relacoes=relacoes;
//    this.numCircles=this.userInformation.length;
//    console.log("Numero de circulos", this.numCircles);

    this.createScene(canvas);

    this.animate();

  }


  public buildBaseMiniMap (utilizador:Utilizador, userInformation:Utilizador[], canvas: ElementRef<HTMLCanvasElement>, ){
    this.currentUser=utilizador;
  this.userInformation=userInformation;

//    this.numCircles=this.userInformation.length;
//    console.log("Numero de circulos", this.numCircles);

//  this.createScene(canvas);

//  this.animateMiniMap();

}


  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    
    // The first step is to get the reference of the canvas element from our HTML document
    
    
    this.canvas = canvas.nativeElement;

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 700;


               
    this.scene = new THREE.Scene();

		const axesHelper = new THREE.AxesHelper(500);
		this.scene.add( axesHelper );
    
    //Circulo central (root)
    let geometry = new THREE.CircleGeometry( this.radius, 60 );
    let material = new THREE.MeshBasicMaterial( { color: 0x555555, side:THREE.DoubleSide } );
    let userCentral = new THREE.Mesh( geometry, material );
    this.scene.add( userCentral );
    
    
    
    this.createLabel(this.currentUser.nome,0,this.radius,0);
    userCentral.add(this.nodeLabel);


    this.usersPositions= new Array(this.numCircles*10); //inclui o root

    /*Preserves User root position*/
    this.usersPositions[0*4]=0; //posX
    this.usersPositions[0*4+1]=0; //posY
    this.usersPositions[0*4+2]=0; //posZ
    this.usersPositions[0*4+3]=0; //Antecessor
    this.nodesCreated.push(this.currentUser.id);
    this.nodesCreated.push(0); // position

    this.processInfoToBuildBasicGraph();
             
    //Cria as linhas de conexão

    const segments = this.numCircles * this.numCircles;

    //Posições iniciais das linhas
    this.positions = new Float32Array(segments);
    //Cores iniciais das linhas
    this.colors = new Float32Array(segments );

    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute( 'position', new THREE.BufferAttribute(this.positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
    lineGeometry.setAttribute( 'color', new THREE.BufferAttribute( this.colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );

    lineGeometry.computeBoundingSphere();

    lineGeometry.setDrawRange( 0, 0 );

    //Material das linhas
    const lineMaterial = new THREE.LineBasicMaterial( {
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    } );

    this.linesMesh = new THREE.LineSegments( lineGeometry, lineMaterial );
    this.scene.add(this.linesMesh);

    //Renderer

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( this.renderer.domElement );

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '200px';
		document.body.appendChild( this.labelRenderer.domElement );


    const controls = new OrbitControls( this.camera, this.labelRenderer.domElement );
    controls.enableRotate=false;
    controls.update();
    window.addEventListener( 'resize', this.onWindowResize );

  }

  public animate(): void {
    
    let vertexpos = 0;
    let colorpos = 0;
    const alpha = 0xffffff;
    //Connect lines and circles

    for(let i=1; i<this.nodesCreated.length; i++){

      //Começa a traçar as linhas definindo o ponto de começo
      this.positions[vertexpos ++]=this.usersPositions[i*4];
      
      this.positions[vertexpos ++]=this.usersPositions[i*4+1];
      
      this.positions[vertexpos ++]=this.usersPositions[i*4+2];

      //search for antecessor position
      var antecessorPosition=0;

      for(let j=0; j<this.nodesCreated.length; j++){

        /*Encontra a posição de antecessor */
        if(this.usersPositions[i*4+3]==this.nodesCreated[j*2]){
          antecessorPosition=this.nodesCreated[j*2+1];
          break;
        }

      }

      this.positions[vertexpos ++]=this.usersPositions[antecessorPosition*4];
      
      this.positions[vertexpos ++]=this.usersPositions[antecessorPosition*4+1];
      
      this.positions[vertexpos ++]=this.usersPositions[antecessorPosition*4+2];
       
        
      //Trata de atribuir as cores
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;

      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
        
        
    }


    this.linesMesh.geometry.setDrawRange( 0, this.numCircles*this.numCircles*3);
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
    this.linesMesh.geometry.attributes.color.needsUpdate = true;


    requestAnimationFrame(() => {
      this.animate();
    });
    
   
    this.renderer.setSize( window.innerWidth,window.innerHeight );
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.setSize( window.innerWidth,window.innerHeight );
    this.labelRenderer.render( this.scene, this.camera );

    this.render();

  }

  private render()
  {
    var SCREEN_W, SCREEN_H;
    SCREEN_W = window.innerWidth;
    SCREEN_H = window.innerHeight;

    var left,bottom,width,height;

    left = 1; bottom = 1; width = SCREEN_W; height = SCREEN_H;
    this.renderer.setViewport (0,0,width,height);
    this.renderer.setScissor(0,0,width,height);
    this.renderer.setScissorTest (true);
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();
    this.renderer.render ( this.scene, this.camera);
    

    left = SCREEN_W-500; bottom = 1; width = 0.30*SCREEN_W; height = 0.15*SCREEN_H;
    this.renderer.setViewport (left,bottom,width,height);
    this.renderer.setScissor(left,bottom,width,height);
    this.renderer.setScissorTest (true);  // clip out "viewport"
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();
    this.renderer.render ( this.scene, this.camera);

    this.labelRenderer.setViewport (0,0,width,height);
    this.labelRenderer.setScissor(0,0,width,height);
    this.labelRenderer.setScissorTest (true);
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();
    this.labelRenderer.render ( this.scene, this.camera);
  }
  
  public animateMiniMap(): void {
    
    let secondIteration=1;
    let vertexpos = 0;
    let colorpos = 0;
    const alpha = 0xffffff;
    //Connect lines and circles

    for(let i=1; i<this.userInformation.length+1; i++){

        //Começa a traçar as linhas definindo o ponto de começo
        this.positions[vertexpos ++]=this.usersPositions[i*3];
        
        this.positions[vertexpos ++]=this.usersPositions[i*3+1];
        
        this.positions[vertexpos ++]=this.usersPositions[i*3+2];

       /* if(i>this.numCircles-this.numCircles/2){ //Exemplo de conexão de segundo nivel (muito básico)

          this.positions[vertexpos ++]=this.usersPositions[secondIteration*3];
        
          this.positions[vertexpos ++]=this.usersPositions[secondIteration*3+1];
        
          this.positions[vertexpos ++]=this.usersPositions[secondIteration*3+2];
            secondIteration++;

        }else{*/
            
            //E o ponto de findo, neste caso o user root
            this.positions[vertexpos ++]=this.usersPositions[0*3];
            
            this.positions[vertexpos ++]=this.usersPositions[0*3+1];
            
            this.positions[vertexpos ++]=this.usersPositions[0*3+2];
       // }
        
        //Trata de atribuir as cores
        this.colors[ colorpos ++ ] = alpha;
        this.colors[ colorpos ++ ] = alpha;
        this.colors[ colorpos ++ ] = alpha;

        this.colors[ colorpos ++ ] = alpha;
        this.colors[ colorpos ++ ] = alpha;
        this.colors[ colorpos ++ ] = alpha;
        
        
    }


    this.linesMesh.geometry.setDrawRange( 0, this.numCircles*this.numCircles);
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
    this.linesMesh.geometry.attributes.color.needsUpdate = true;

    this.frameId=requestAnimationFrame(() => {
      this.animateMiniMap();
    });
    
    this.renderer.render(this.scene, this.camera);
    this.renderer.setViewPort(100,100,800,400);
    this.renderer.setScissor(100,100,800,400);
    this.renderer.setScissorTest(true);
    
    
    this.labelRenderer.render( this.scene, this.camera );
    this.labelRenderer.setViewPort(100,100,800,400);
    this.labelRenderer.setScissor(100,100,800,400);
    this.labelRenderer.setScissorTest(true);
  }

  //Adaptado a partir de: https://github.com/mrdoob/three.js/blob/master/examples/css2d_label.html
  private createLabel(text:String, posX: Number, posY:Number, posZ:Number){

    this.nodeDiv = document.createElement( 'div' );
    this.nodeDiv.className = 'nodesLabel';
    this.nodeDiv.textContent = text;
    this.nodeDiv.style.marginTop = '8em';
    this.nodeLabel = new CSS2DObject( this.nodeDiv );
    this.nodeLabel.position.set( posX, posY, posZ );
				
  }

  
  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
      this.renderer.dispose();
      this.labelRenderer.dispose();
    }
  }

  private onWindowResize(): void {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();


    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.labelRenderer.setSize( window.innerWidth, window.innerHeight );

  }



  private processInfoToBuildBasicGraph(){

    /* É importante saber que é utilizado o request netByPerspective, ou seja, em primeiro virá sempre as relações userRoot em userID1  */
    var cloneRelacoes= this.relacoes;
    var position=1;

    for(var j=0; j<cloneRelacoes.length; j++){
      

      if(cloneRelacoes[j]!=null && cloneRelacoes[j].userID1==this.currentUser.id){ //Se userID1 for igual a user root, então a relação é direta, logo desenha USER ID2

        //Desenha user node 2
        if(!this.checkIfNodeWasCreated(cloneRelacoes[j].userID2)){
          this.drawNodesForBasicGraph(position, 1, cloneRelacoes[j].userID2, this.currentUser.id);
          this.nodesCreated.push(cloneRelacoes[j].userID2);
          this.nodesCreated.push(position);
          position++;
        }       

      }else if(cloneRelacoes[j]!=null && cloneRelacoes[j].userID1!=this.currentUser.id){//Trata relacoes com userID1 diferente do root

        var userID=cloneRelacoes[j].userID1;
        for(var k=0; k<cloneRelacoes.length; k++){
          
          if(cloneRelacoes[k]!=null && cloneRelacoes[k].userID1==userID){

            //Desenha usernode2
            if(!this.checkIfNodeWasCreated(cloneRelacoes[k].userID2)){
              
              this.drawNodesForBasicGraph(position, 2, cloneRelacoes[k].userID2, userID);
              this.nodesCreated.push(cloneRelacoes[k].userID2);
              this.nodesCreated.push(position);
              position++;
            }
            
            cloneRelacoes[k]=null;
          }
        }

      }
      cloneRelacoes[j]=null;
    
    }
    
  }

  private drawNodesForBasicGraph(i:number, radiusMultiplier:number, id:string, antecessor:string){
    
    //theta são angulos de uma circunferência -- adaptado de https://stackoverflow.com/a/26601039
    var theta = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * (Math.PI / 3), 3 * (Math.PI / 4), 5 * (Math.PI / 6), Math.PI, 7 * (Math.PI / 6), 5 * (Math.PI / 4), 4 * (Math.PI / 3), 3 * (Math.PI / 2), 5 * (Math.PI / 3), 7 * (Math.PI / 4), 11 * (Math.PI / 6)];
    
    if(this.thetaI>theta.length){
      this.thetaI=0;
    }

    let geometry = new THREE.CircleGeometry( this.radius, 60 );
    let  material = new THREE.MeshBasicMaterial( { color: 0xffffff, side:THREE.DoubleSide } );
    var userNode = new THREE.Mesh( geometry, material );
    this.scene.add( userNode );

    //Calcula ângulo de posicionamento de forma radial -- adaptado de https://stackoverflow.com/a/26601039
    let posX=Math.round(this.radius*radiusMultiplier*10*(Math.cos(theta[this.thetaI])));
    let posY=Math.round(this.radius*radiusMultiplier*10*(Math.sin(theta[this.thetaI])));
    let posZ=0;
    this.thetaI++;
    //Iterar pelo user root,

    userNode.position.set(posX, posY, posZ);
    this.usersPositions[i*4]=posX;
    this.usersPositions[i*4+1]=posY;
    this.usersPositions[i*4+2]=posZ;
    this.usersPositions[i*4+3]=antecessor;

    this.createLabel(this.graphInfoService.getUserWithIDFromList(id, this.userInformation).nome, posX, this.radius, posZ);
    userNode.add(this.nodeLabel);
  }

  private checkIfNodeWasCreated(id:string):Boolean{
    
    for(var i=0; i<this.nodesCreated.length; i++){

      if(this.nodesCreated[i]==id){
        return true;
      }

    }
    return false;
  }
}
