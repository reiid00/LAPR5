import { Component, OnInit } from '@angular/core';
import { CloudData, ZoomOnHoverOptions ,CloudOptions  } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';
import { TagsService } from '../_services/tags.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tag-cloud-all-users',
  templateUrl: './tag-cloud-all-users.component.html',
  styleUrls: ['./tag-cloud-all-users.component.css']
})
export class TagCloudAllUsersComponent implements OnInit{

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  constructor(private tagsService: TagsService) { }

  tags: Tag[]=[];
  tags_str: string[]=[];
  tags_filtradas: unknown[]=[];
  total_tags : number;
  media : number;
  temp : number;
  new_data : CloudData[]=[];

  ngOnInit(): void {
    this.getUtilizadores();
    
  }

  data: CloudData[] = [
  ];

  newData(){
    const changedData$: Observable<CloudData[]> = of(this.new_data);
    changedData$.subscribe(res => this.data = res);
  }

  logClicked(clicked: CloudData){
    console.log(clicked);
  }

  
  getUtilizadores(){
    this.tagsService.getTags().subscribe(tags=>{
      this.tags=tags;
      
      this.update();
    });
  }

  fillArrayAndPercentile(){

    this.total_tags=this.tags.length;

    for (let i = 0; i < this.total_tags; i++) {
      this.tags_str[i]=this.tags[i].titulo;
    }
   

  const normalize = s => s.toLowerCase(),
  mapCount = (m, k) => m.set(k, (m.get(k) || 0) + 1),
  array = this.tags_str,
  map = array.reduce((m, v) => mapCount(m, normalize(v)), new Map),
  array1 = Array.from(map.keys()),
  array2 = Array.from(map.values());

  const percentile = require("percentile");
  const res_key = percentile(10, array2); //quanto tiver mais tags mudar para 90
  
  console.log(res_key);
  console.log(array1);
  console.log(array2);

  for (let i = 0; i < this.total_tags; i++) {
    const texto:string = array1[i] as string;
    const peso:number = array2[i] as number;
    const res:number = res_key as number;
    if(peso>=res){
      this.new_data.push({ text: texto, weight: peso });
    }
  }
  

  }

  update(){
    console.log(this.tags);
    this.fillArrayAndPercentile();
    console.log('Data:',this.data);
  }
}
