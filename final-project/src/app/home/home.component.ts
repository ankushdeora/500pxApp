import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Photo } from '../models/Photo';

import { DataService } from '../services/data.service';
interface feaPhoto{
  photos: Array<Photo>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  photos: Photo[];
  userStatus : Boolean;
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentAuth.subscribe(status => this.userStatus = status);
    this.http.get<feaPhoto>("https://api.500px.com/v1/photos?consumer_key=ycVhYsDeMblD3bPN8sFzKPLBfK3yrfZvn7qPsGf5&feature=popular&sort=created_at&image_size=3&include_store=store_download&include_states=voted").subscribe(res => {
      console.log(res.photos);
      this.photos = res.photos;
      // console.log(this.selectedPhoto.comments)
      this.changeMeaasge();
    });
    
  }

  changeMeaasge(){
    console.log("changeMessage");
    this.dataService.changeAuth(true);
  }
}
