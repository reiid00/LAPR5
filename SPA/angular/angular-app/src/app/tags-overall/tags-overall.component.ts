import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-tags-overall',
  templateUrl: './tags-overall.component.html',
  styleUrls: ['./tags-overall.component.css']
})
export class TagsOverallComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }
  isLoggedIn:boolean;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
  }

}
