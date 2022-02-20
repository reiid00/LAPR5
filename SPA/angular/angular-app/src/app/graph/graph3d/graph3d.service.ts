import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UtilizadorService } from '../../_services/utilizador.service';
import { Utilizador } from '../../utilizador';
import { RelationService } from '../../relation.service';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {Relation} from '../../relation';
import { FlyControls  } from 'three/examples/jsm/controls/FlyControls.js';
import { GraphInfoService } from '../graph-info.service';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { EstadoHumor } from 'src/app/estado-humor';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Graph3dService {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private estadosHumor: EstadoHumor[] = new Array();
  private labelRenderer;
  private camera3d;
  private camera2d;
  private miniMapCheckBox;
  private twoDCheckBox;
  private firstPersonCheckBox;
  private multipleViewsCheckBox;
  private threeDCheckBox;
  private scene: THREE.Scene;
  private canvasRef:ElementRef<HTMLCanvasElement>;
  private cameraSwitch:boolean=true;
  private composer;
  private composer2d;
  /*Para criação de labels em HTML */
  
  private nodeDiv;
  private nodeLabel;

  /* Controlos */
  private controls;
  private clock;
  /*Para conexões dos nodes */
  private positions;
  private colors;
  private linesMesh;
  private imgMesh;
  private estadoHumorMesh;
  private usersInformation;

  /*Criação de nodes */
  private maxNodes=100;
  private radius=20;
  private theta = [0, Math.PI/12, Math.PI / 6, Math.PI / 4, Math.PI / 3, 5*(Math.PI/12), 
    Math.PI / 2,
    7 * (Math.PI / 12),  
    2 * (Math.PI / 3), 
    3 * (Math.PI / 4), 
    5 * (Math.PI / 6), 
    11 * (Math.PI / 12), 
    Math.PI,
    13 * (Math.PI / 12),  
    7 * (Math.PI / 6), 
    5 * (Math.PI / 4), 
    4 * (Math.PI / 3),
    17 * (Math.PI / 12),  
    3 * (Math.PI / 2), 
    19 * (Math.PI / 12), 
    5 * (Math.PI / 3), 
    7 * (Math.PI / 4), 
    11 * (Math.PI / 6),
    23 * (Math.PI / 12), ];

  private createdNodes:any[]=new Array();
  
  /*Colisões*/
  private lastPosition= new THREE.Vector3();
  private intersected:boolean=false;
  /* Floating Tip & Mouse Hover raycaster */
  private raycaster = new THREE.Raycaster();
	private mouse = new THREE.Vector2();
  private intersectedObject;
  private playerPosition;
 
  /* Informações sobre relações, utilizadores */
  private currentUser:Utilizador;
  private userInformation:Utilizador[];
  private relacoes:Relation[];
  private reversedRelacoes: Relation[];
  private frameId: number = null;

  public constructor(private ngZone: NgZone, private token: TokenStorageService,   
                      private utilizadorService : UtilizadorService, private relationsService:RelationService,
                      private graphInfoService: GraphInfoService
                      ) {
  }

  /**  */
  public buildBasicScene(utilizador:Utilizador, userInformation:Utilizador[], relacoes:[Relation], reversedRelacoes:Relation[], canvas: ElementRef<HTMLCanvasElement>,estadosHumor:EstadoHumor[] ){
  

    this.currentUser=utilizador;
    this.userInformation=userInformation;
    this.relacoes=relacoes;
    this.reversedRelacoes=reversedRelacoes;
    this.estadosHumor = estadosHumor;

    this.canvasRef=canvas;

    this.initMenu();

    this.createScene(this.canvasRef);

    this.animate();

  }

  /** Cria uma cena */
  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

    // The first step is to get the reference of the canvas element from our HTML document
    
    this.canvas = canvas.nativeElement;

    this.camera3d = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 5, 5000 );
    this.camera3d.position.set(0,25,700);

    this.camera2d = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera2d.position.set(0,25,700);

               
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();
    
     //lights
   
				// LIGHTS
    //AMBIENT LIGHT0
    const light = new THREE.AmbientLight( 0xffffff ,0.5 ); // soft white light
    this.scene.add( light );

    // TWO FIXED directional LIGHTS
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 200, 100);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-200, -200, -100);
    directionalLight2.castShadow = true;
    this.scene.add(directionalLight2);

  
    const loader = new THREE.TextureLoader();
    this.scene.background = loader.load( '../../../assets/img/background_threejs15.png' );

    var imgLoader = new THREE.TextureLoader();
    var imgMaterial = new THREE.MeshLambertMaterial({
      map: imgLoader.load('../../../assets/img/placeholder.jpg')
    });
    
    var imgGeometry = new THREE.PlaneGeometry(50, 50*.75);
    this.imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);





    //Circulo central (root)

    let geometry = new THREE.SphereGeometry( this.radius, 32, 16 );
    let material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x101010, side:THREE.DoubleSide } );
    let userCentral = new THREE.Mesh( geometry, material );
    this.scene.add( userCentral );
    
    this.usersInformation= new Array(this.maxNodes*5); //inclui o root
    
    this.createNodeLabel(this.currentUser.nome,0,this.radius,0);
    userCentral.add(this.nodeLabel);
    this.allMeshes.push(userCentral);


    /*Guarda informação acerca do User root */
    this.usersInformation[0*5]=0; //posX
    this.usersInformation[0*5+1]=0; //posY
    this.usersInformation[0*5+2]=0; //posZ
    this.usersInformation[0*5+3]=0; //Antecessor
    this.usersInformation[0*5+4]=this.currentUser.id; //his id

    this.createdNodes.push(this.currentUser.id);
    this.createdNodes.push(0); // position
   
    //theta são angulos de uma circunferência -- adaptado de https://stackoverflow.com/a/26601039

    this.processInfoToBuildBasicGraph();

    //Cria as linhas de conexão

    /*itemSize * numVertices * numero de conexoes por cada par de nodes*/
    const segments = 3 * (this.maxNodes * 2);

    //Posições iniciais das linhas
    this.positions = new Float32Array(segments);
    //Cores iniciais das linhas
    this.colors = new Float32Array(segments);

    //Cria uma buffergeometry
    const lineGeometry = new THREE.BufferGeometry();

    //Referencia ao array positions que guardará futuras posições das linhas
    lineGeometry.setAttribute( 'position', new THREE.BufferAttribute(this.positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
    //Referencia ao array colors que guardará futuras cores das linhas
    lineGeometry.setAttribute( 'color', new THREE.BufferAttribute( this.colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );

    lineGeometry.computeBoundingSphere();

    lineGeometry.setDrawRange( 0, 0 );

    //Material das linhas
    const lineMaterial = new THREE.LineBasicMaterial( {
      color: 0xffffff,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      side:THREE.DoubleSide
    } );

    this.linesMesh = new THREE.LineSegments( lineGeometry, lineMaterial );
    this.scene.add(this.linesMesh);

    
    //Renderer

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '75px';
		document.body.appendChild( this.labelRenderer.domElement );

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const effectSobel = new ShaderPass( SobelOperatorShader );
    effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio

    const ssaoPass = new SSAOPass( this.scene, this.camera3d, width, height );
    ssaoPass.kernelRadius = 16;
    const ssaoPass2d = new SSAOPass( this.scene, this.camera2d, width, height );
    ssaoPass.kernelRadius = 16;
    const effectGrayScale = new ShaderPass( LuminosityShader );

        this.composer = new EffectComposer( this.renderer );
        this.composer.addPass(new RenderPass(this.scene,this.camera3d));
				this.composer.addPass( ssaoPass );
				this.composer.addPass( effectGrayScale );
				this.composer.addPass( effectSobel );

        this.composer2d = new EffectComposer( this.renderer );
        this.composer2d.addPass(new RenderPass(this.scene,this.camera2d));
				this.composer2d.addPass( ssaoPass2d );
				this.composer2d.addPass( effectGrayScale );
				this.composer2d.addPass( effectSobel );
        



    this.build3DControls();
    
    document.addEventListener('mousemove', event=> this.onMouseMove(event), false);

    window.addEventListener('resize', event=> this.onWindowResize());
    window.addEventListener('keydown', event => this.onKeyDown(event), false);
    window.addEventListener( 'mousedown', event => this.onDocumentMouseDown(event), false );

    this.controls.addEventListener('change', event => this.collisionDetector());
  }

  private build3DControls(){
    this.camera3d.position.set(-200,-200,400);
    this.camera3d.lookAt(0 ,0,0);
    this.controls = new FlyControls( this.camera3d, this.labelRenderer.domElement );
    this.controls.movementSpeed = 100;
    this.controls.domElement = this.labelRenderer.domElement;
    this.controls.rollSpeed = 0.5;
    this.controls.dragToLook = true;
    this.controls.autoForward = false;
    this.controls.lookVerticle=true;
    this.controls.update(this.clock.getDelta());
  }

  private build2DControls(){

    this.camera3d.position.set(0,25,700);
    this.camera3d.lookAt(0,0,0);
    this.controls = new OrbitControls( this.camera3d, this.labelRenderer.domElement );
    this.controls.enableRotate=false;
    this.controls.update();

  }

  
  public onKeyDown(event):void{
    
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
      event.preventDefault();
   }
    
    var keyCode=event.which;

    switch(keyCode){
      case 72: {//H
          console.log("Camera Reset");
          this.controls.dispose();
          this.build3DControls();
          break;
      }

      case 74: { //J
        console.log("Camera change");

        if(this.cameraSwitch){
          this.controls.dispose();
          this.build2DControls();
          this.cameraSwitch=false;
        }else{
          this.controls.dispose();
          this.build3DControls();
          this.cameraSwitch=true;
        }
      } 
      

    }

  }

  public initMenu(){
    this.miniMapCheckBox = document.getElementById('mini-map');
    this.miniMapCheckBox.checked = true;
    /*this.twoDCheckBox = document.getElementById('2d-view');
    this.twoDCheckBox.checked = false;
    this.threeDCheckBox = document.getElementById('3d-view');
    this.threeDCheckBox.checked = true;
    this.firstPersonCheckBox = document.getElementById('first-person');
    this.firstPersonCheckBox.checked = false;
    this.multipleViewsCheckBox = document.getElementById('multiple-views');
    this.multipleViewsCheckBox.checked = false;*/
  }

  private tipCreated:boolean=false;

  public animate(): void {

    this.controls.update(this.clock.getDelta());
    let vertexpos = 0;
    let colorpos = 0;
    let alpha=1;
    
  
    /* Floating tip on mouse hover */ 
    this.raycaster.setFromCamera( this.mouse, this.camera3d );
    this.floatingTipHandler();

    //Connect lines and circles
    for(let i=1; i<this.createdNodes.length; i++){

      var antecessorPosition=0;

      for(let j=0; j<this.createdNodes.length; j++){
        /* Encontra a posição de antecessor */
        if(this.usersInformation[i*5+3]==this.createdNodes[j*2]){
          antecessorPosition=this.createdNodes[j*2+1];
          break;
        }

      }
      var lineOffsetX=5;
      var lineOffsetY=5;
      //1ª linha a ser criada -- direção dentro->fora
      //Começa a traçar as linhas definindo o ponto de começo (node de fora)
      this.positions[vertexpos ++]=this.usersInformation[i*5]+lineOffsetX;
      this.positions[vertexpos ++]=this.usersInformation[i*5+1]+lineOffsetY;
      this.positions[vertexpos ++]=this.usersInformation[i*5+2];

      //Ponto de fim
      this.positions[vertexpos ++]=this.usersInformation[antecessorPosition*5];
      this.positions[vertexpos ++]=this.usersInformation[antecessorPosition*5+1];
      this.positions[vertexpos ++]=this.usersInformation[antecessorPosition*5+2];

      //2ª Linha a ser criada -- direção fora->dentro

      lineOffsetX=10;
      lineOffsetY=10;
      //Começa a traçar as linhas definindo o ponto de começo (node de fora)
      this.positions[vertexpos ++]=this.usersInformation[i*5]-lineOffsetX;
      this.positions[vertexpos ++]=this.usersInformation[i*5+1]-lineOffsetY;
      this.positions[vertexpos ++]=this.usersInformation[i*5+2];

      //Ponto de fim
      this.positions[vertexpos ++]=this.usersInformation[antecessorPosition*5];
      this.positions[vertexpos ++]=this.usersInformation[antecessorPosition*5+1];
      this.positions[vertexpos ++]=this.usersInformation[antecessorPosition*5+2];
       
      //alpha=(1 / Number(this.graphInfoService.getRelationStrengthFromList(this.usersInformation[i*5+4], this.usersInformation[5*i+3], this.relacoes)))*10;
      //Define do alpha das cores das linhas
      //console.log(alpha);
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;

     //alpha=(1 / Number(this.graphInfoService.getRelationStrengthFromList(this.usersInformation[i*5+4], this.usersInformation[5*i+3], this.reversedRelacoes)))*10;
      //console.log(alpha);
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
      this.colors[ colorpos ++ ] = alpha;
        
    }

    this.linesMesh.geometry.setDrawRange(0, 3*(this.maxNodes*2));
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
    this.linesMesh.geometry.attributes.color.needsUpdate = true;
    //this.linesMesh.geometry.computeBoundingSphere();

    requestAnimationFrame(() => {
      this.animate();
    });

    this.renderGraph3d();
    if(this.miniMapCheckBox.checked)
    {
      this.renderMiniMap();
    } 
    /*if(this.twoDCheckBox.checked)
    {
      this.threeDCheckBox.checked = false;
      this.renderGraph2d();
      
    } else {
      this.threeDCheckBox.checked = true;
    }*/

    
  /* if(this.threeDCheckBox.checked)
    {
      this.twoDCheckBox.checked = false;
      this.renderGraph3d();
      if(this.miniMapCheckBox.checked)
    {
      this.renderMiniMap();
    } 
    } else {
      this.twoDCheckBox.checked = true;
    }*/
  }

  private renderMiniMap()
  {
    var SCREEN_W, SCREEN_H;
    SCREEN_W = window.innerWidth;
    SCREEN_H = window.innerHeight;

    var left,bottom,width,height;
    left = SCREEN_W-400; bottom = 1; width = 0.20*SCREEN_W; height = 0.20*SCREEN_H;

    this.renderer.setViewport (left,bottom,width,height);
    this.renderer.setScissor(left,bottom,width,height);
    this.renderer.setScissorTest (true); 
    this.composer2d.render();
  }

  private renderGraph2d()
  {
    this.renderer.setSize( window.innerWidth,window.innerHeight );
    this.labelRenderer.setSize( window.innerWidth,window.innerHeight );

    this.renderer.setViewport (0,0,window.innerWidth,window.innerHeight);
    this.renderer.setScissor(0,0,window.innerWidth,window.innerHeight);
    this.renderer.setScissorTest (true);

    this.camera2d.aspect = window.innerWidth/window.innerHeight;
    this.camera2d.updateProjectionMatrix();
    
    this.composer2d.render();
    this.labelRenderer.render ( this.scene, this.camera2d);

  }

  private renderGraph3d()
  {
     
    this.renderer.setSize( window.innerWidth,window.innerHeight );
    this.labelRenderer.setSize( window.innerWidth,window.innerHeight );

    this.renderer.setViewport (0,0,window.innerWidth,window.innerHeight);
    this.renderer.setScissor(0,0,window.innerWidth,window.innerHeight);
    this.renderer.setScissorTest (true);

    this.camera3d.aspect = window.innerWidth/window.innerHeight;
    this.camera3d.updateProjectionMatrix();
    
    this.composer.render();
    this.labelRenderer.render ( this.scene, this.camera3d);

  }


  /** Cria os nomes 
  * //Adaptado a partir de: https://github.com/mrdoob/three.js/blob/master/examples/css2d_label.html
  */  private createNodeLabel(text:String, posX: Number, posY:Number, posZ:Number){

    this.nodeDiv = document.createElement( 'div' );
    this.nodeDiv.className = 'nodeLabel';
    this.nodeDiv.textContent = text;
    this.nodeDiv.style.marginTop = '-1em';
    this.nodeDiv.style.fontWeight="bold";

    this.nodeLabel = new CSS2DObject( this.nodeDiv );
    this.nodeLabel.position.set( posX, posY, posZ );
				
  }

  /** Cria as floating tips 
   * //Adaptado a partir de: https://github.com/mrdoob/three.js/blob/master/examples/css2d_label.html
  */
  private createFloatingTipLabel(user:Utilizador){
    
    this.nodeDiv = document.createElement( 'div' );
    this.nodeDiv.className = 'floatingTipLabel';
    this.nodeDiv.setAttribute('style', 'white-space: pre;');
    this.nodeDiv.textContent = " \r\n";
    this.nodeDiv.textContent = "Nome: "+user.nome + " \r\n";
    this.nodeDiv.textContent += "Email: " +user.email + "\r\n";
    this.nodeDiv.style.marginTop = '-1em';
    this.nodeDiv.style.color="white";
    this.nodeDiv.style.backgroundColor="black";
    
    
    var x = this.playerPosition.getComponent(0);
    var y = this.playerPosition.getComponent(1) + 2*this.radius;
    var z = this.playerPosition.getComponent(2) + 20;
    this.imgMesh.position.set(x,y,z);

    
    this.estadoHumorMesh.position.set(x+40,y,z);

    
    this.nodeLabel = new CSS2DObject( this.nodeDiv );
    this.nodeLabel.position.set(0, 3*this.radius, 20);


  
  }

  /** Guarda a posição do rato */
  private onMouseMove(event){

    event.preventDefault();

    var rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
    this.mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
    
  }


  /** Método que trata das floating tips e deteção de interseção do rato com os variados nodes */
  private floatingTipHandler(){

    this.raycaster.setFromCamera(this.mouse, this.camera3d);

		const intersection = this.raycaster.intersectObjects( this.allMeshes );

    if(intersection.length>0){
      
      this.intersectedObject=intersection[0].object;
     
      this.intersectedObject.material.color.set(0x000000);

      this.playerPosition=new THREE.Vector3();
      this.playerPosition.setFromMatrixPosition(this.intersectedObject.matrixWorld);
      
      var user:Utilizador=this.getPlayerFromPosition(this.playerPosition);

      if(!this.tipCreated && user != null){
        this.processEstadoHumorMesh(user);
        this.createFloatingTipLabel(user);
        this.intersectedObject.add(this.nodeLabel);
        this.tipCreated=true; 
        this.scene.add(this.imgMesh);
        this.scene.add(this.estadoHumorMesh);

      }

    }else{

      if(this.tipCreated){ 
        this.intersectedObject.remove(this.nodeLabel);
        this.intersectedObject.material.color.set(0xffffff);
        this.tipCreated=false;
        this.scene.remove(this.imgMesh);
        this.scene.remove(this.estadoHumorMesh);
      }

    }
  }

  private processEstadoHumorMesh(user:Utilizador)
  {
    var imgLoader = new THREE.TextureLoader();
    var imgMaterial = new THREE.MeshLambertMaterial({
      map: imgLoader.load('../../../assets/img/'+this.imgEstadoHumor(user.estadoHumorId)+ ".png")
    });
    
    var imgGeometry = new THREE.PlaneGeometry(20, 20*.75);
    this.estadoHumorMesh = new THREE.Mesh(imgGeometry, imgMaterial);
  }

  private imgEstadoHumor(estadohumorId:string)
  {
    for (var i = 0; i< this.estadosHumor.length ; i++)
    {
      if (estadohumorId == this.estadosHumor[i].id)
      {
        return this.estadosHumor[i].nome;
      }
    }
    return this.estadosHumor[0].nome;
  }

  
  /** Método apenas funcional para visualizar a rede na perspetiva do utilizador
   * É o cenário básico.
   */
  private processInfoToBuildBasicGraph(){

    /* É importante saber que é utilizado o request netByPerspective, ou seja, em primeiro virá sempre as relações userRoot em userID1  */
    var cloneRelacoes= this.relacoes;
    var position=1;
    var thetasUsed:number[]=new Array();
    var iOfTheta=0;
    var iOfSecondLvlTheta=0;
    var radiusMultiplier=1.5;
      
    for(var j=0; j<cloneRelacoes.length; j++){
      

      if(cloneRelacoes[j]!=null && cloneRelacoes[j].userID1==this.currentUser.id){ //Se userID1 for igual a user root, então a relação é direta, logo desenha USER ID2

        //Desenha user node 2
        if(!this.checkIfNodeWasCreated(cloneRelacoes[j].userID2)){
        
          if(thetasUsed.length<=this.theta.length){
            while(thetasUsed.includes(iOfTheta)){ //gera um theta aleatório para distribuir o node na rede
              iOfTheta=Math.floor(Math.random() * (this.theta.length));
            }
            //Guarda theta usado
            thetasUsed.push(iOfTheta);
          }else{
            window.alert("Excedido o número de utilizadores de primeiro nível para representar. De momento não são suportado mais do que "+ this.theta.length.toString());
            break;
          }
          

          this.drawNodesForBasicGraph(position, 1, cloneRelacoes[j].userID2, this.currentUser.id, iOfTheta);
          this.createdNodes.push(cloneRelacoes[j].userID2);
          this.createdNodes.push(position);
          position++;
        }       

      }else if(cloneRelacoes[j]!=null && cloneRelacoes[j].userID1!=this.currentUser.id){//Trata relacoes com userID1 diferente do root

        var userID=cloneRelacoes[j].userID1;
        //Theta para nodes de 2º nivel
        iOfSecondLvlTheta=iOfTheta;

        //Para definir um raio maior ou menor
        if(radiusMultiplier==2){
          radiusMultiplier-=0.5;
        }else{
          radiusMultiplier+=0.5;
        }

        for(var k=0; k<cloneRelacoes.length; k++){
          
          if(cloneRelacoes[k]!=null && cloneRelacoes[k].userID1==userID){

            //Desenha usernode2
            if(!this.checkIfNodeWasCreated(cloneRelacoes[k].userID2)){
              
              iOfSecondLvlTheta=this.drawNodesForBasicGraph(position, radiusMultiplier, cloneRelacoes[k].userID2, userID, iOfSecondLvlTheta);
              this.createdNodes.push(cloneRelacoes[k].userID2);
              this.createdNodes.push(position);
              position++;
            }
            //Limpa do array a relação
            cloneRelacoes[k]=null;
          }
        }

      }
      //Limpa do array a relação
      cloneRelacoes[j]=null;
    
    }
    
  }

  private raycaster2 = new THREE.Raycaster(); // Needed for object intersection

  

  public onDocumentMouseDown( event ) {
    
    // Welcome to the exciting world of raycasting !
    // First let's get some mouse coordinates:
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // This is basically converting 2d coordinates to 3d Space:
    this.raycaster2.setFromCamera(this.mouse, this.camera3d);
    // And checking if it intersects with an array object
    var intersects = this.raycaster2.intersectObjects(this.allMeshes);

    // does your cursor intersect the object on click ? 
    //console.log(intersects.length > 0 ? "yes" : "no");
      
    // And finally change the color:
    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }

  }

  


  private allMeshes:any[]=new Array();

  /** Algoritmo base para desenhar nodes. 
   * Pode sofrer alterações ou adaptações consoante a informação recebida */
  private drawNodesForBasicGraph(i:number, radiusMultiplier:number, id:string, antecessor:string, iOfTheta:number): number{
    
    //theta são angulos de uma circunferência -- adaptado de https://stackoverflow.com/a/26601039
   
    if(iOfTheta>this.theta.length){
      iOfTheta=0;
    }

    let geometry = new THREE.SphereGeometry( this.radius, 32, 16 );
    let  material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x101010,side:THREE.DoubleSide } );
    var userNode = new THREE.Mesh( geometry, material );
    this.scene.add( userNode );

    let posX, posY, posZ;
    let posXA, posYA, posZA;
    
    //Calcula ângulo de posicionamento de forma radial -- adaptado de https://stackoverflow.com/a/26601039
    posX=Math.round(this.radius*radiusMultiplier*10*(Math.cos(this.theta[iOfTheta])));
    posY=Math.round(this.radius*radiusMultiplier*10*(Math.sin(this.theta[iOfTheta])));;
    posZ=0;
    iOfTheta++;
  
    userNode.position.set(posX, posY, posZ);
    this.allMeshes.push(userNode);

    this.usersInformation[i*5]=posX;
    this.usersInformation[i*5+1]=posY;
    this.usersInformation[i*5+2]=posZ;
    this.usersInformation[i*5+3]=antecessor;
    this.usersInformation[i*5+4]=id;

    //Posições das forças da relação
    for(var i = 0; i < this.usersInformation.length;i++)
    {
      if(this.usersInformation[i]==antecessor && (i-4)%5==0)
      {
        posZA=this.usersInformation[i-2];
        posYA=this.usersInformation[i-3];
        posXA=this.usersInformation[i-4];
      }
    }

    //Força da relação dentro->fora
    //this.createNodeLabel(this.graphInfoService.getRelationStrengthFromList(antecessor, id, this.relacoes),-((posX-posXA)/2),(this.radius)-((posY-posYA)/2),-((posZ-posZA)/2));
    var direction;
    if(posX>0){
      direction=" -->"
    }else{
      direction=" <--"
    }


    this.createNodeLabel( this.graphInfoService.getRelationStrengthFromList(id, antecessor, this.reversedRelacoes)+" -->", -((posX-posXA)/2),-((posY-posYA)/2),-((posZ-posZA)/2));
    userNode.add(this.nodeLabel);
   
    this.createNodeLabel("<-- "+this.graphInfoService.getRelationStrengthFromList(antecessor, id, this.relacoes), -((posX-posXA)/2),-(this.radius/2)-((posY-posYA)/2),-((posZ-posZA)/2));
    userNode.add(this.nodeLabel);

    //Nomes
  
    this.createNodeLabel(this.graphInfoService.getUserWithIDFromList(id, this.userInformation).nome, 0, this.radius, 0);
    userNode.add(this.nodeLabel);

    return iOfTheta;
  }

 /**Verifica se um node foi criado */
  private checkIfNodeWasCreated(id:string):Boolean{
    
    for(var i=0; i<this.createdNodes.length; i++){

      if(this.createdNodes[i]==id){
        return true;
      }

    }
    return false;
  }



  public ngOnDestroy(): void {
    this.scene=null;
    this.renderer=null;
    this.labelRenderer=null;
    this.reloadPage();
  }

  

  
  reloadPage(): void {
    window.location.reload();
  }


 private getPlayerFromPosition(playerPosition:THREE.Vector3): Utilizador{
    for(var i=0; i<this.usersInformation.length; i++){
      if(this.usersInformation[i*5]==playerPosition.getComponent(0) && this.usersInformation[i*5+1]==playerPosition.getComponent(1) && this.usersInformation[i*5+2]==playerPosition.getComponent(2)){
        return this.graphInfoService.getUserWithIDFromList(this.usersInformation[5*i+4], this.userInformation);
      }
    }
    return null;
  }

  private onWindowResize(): void {

    this.camera3d.aspect = window.innerWidth / window.innerHeight;
    this.camera3d.updateProjectionMatrix();
    this.camera2d.aspect = window.innerWidth / window.innerHeight;
    this.camera2d.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
    this.composer.setSize( window.innerWidth, window.innerHeight );

  }



 /** Algoritmo para deteção de colisões -- apenas para user nodes */
  private collisionDetector(){


    //Check for collision
    for(var i=0; i<this.allMeshes.length; i++){

      //Calcula distância entre camera3d e objetos
      var d=this.camera3d.position.distanceTo(this.allMeshes[i].position);

      /*Verifica se é menor que a distância minima entre camara e objeto, se for há interseção
      e ativa uma flag*/
      if(d<this.radius+this.camera3d.near){
        this.intersected=true;
      }

    }
    //Guarda última posição conhecida antes de haver colisão
    if(!this.intersected){
      this.lastPosition=this.camera3d.position.clone();
    }else{ 
      /* Se a flag estiver a true, significa que houve colisão, e, portanto, move a camera para 
      última posição conhecida antes da colisão*/
      this.camera3d.position.set(this.lastPosition.getComponent(0), this.lastPosition.getComponent(1), this.lastPosition.getComponent(2));
      this.intersected=false;
    }

  }
}

