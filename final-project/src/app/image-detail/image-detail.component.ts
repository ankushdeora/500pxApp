import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Photo } from '../models/Photo';
import { PhotoService } from '../services/photo.service';

import { HttpClient, HttpHeaders} from '@angular/common/http';

interface photoTag{
  photo: Photo;
}

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {


  tags:string;
  remTags: string;
  selectedPhoto: Photo;
  savedTags:Array<string>;
  comment: string;
  sub;
  sub1;
  allowed: Boolean;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private photoService: PhotoService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.allowed = true;
    //var id = +this.route.snapshot.paramMap.get('id');
    this.sub = this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      console.log(id);
      // this.selectedPhoto = this.photoService.serachImage(Number(id));
      // console.log(this.selectedPhoto);
      this.http.get<photoTag>("https://api.500px.com/v1/photos/"+id+"?consumer_key=ycVhYsDeMblD3bPN8sFzKPLBfK3yrfZvn7qPsGf5&tags=1&comments=1").subscribe(res => {
        console.log(res.photo.tags);
        this.selectedPhoto = res.photo;
        console.log(this.selectedPhoto.comments)
      });
    });

    this.sub1 = this.route.queryParams
    .subscribe(params => {
      console.log("test");
      console.log(params.allowed);
      if(params.allowed!=null){
        this.allowed = (params.allowed == 'true');
      }
      console.log(typeof(this.allowed)+"value "+this.allowed);
    });
  }

  deletePhoto(){
    console.log("deletePhoto");
    this.http.post('http://localhost:3000/photoDelete', {id :this.selectedPhoto.id}).subscribe(res => {
        console.log(res);
        alert("Photo with title '"+this.selectedPhoto.name+"' has been successfully deleted!");
        window.location.href = "http://localhost:4200/user";
      },
      err => {
        console.log(err);
      }
    );
  }

  addPhotoTag(){
    console.log("addPhotoTag");
    this.http.post('http://localhost:3000/addPhotoTag', {tags: this.tags, id: this.selectedPhoto.id}).subscribe(res => {
      console.log(res);
      alert("Tags '"+this.tags+"' success fully added!");
      window.location.href = "http://localhost:4200/detail/"+this.selectedPhoto.id;
    });
  }

  remPhotoTag(){
    console.log("remPhotoTag");
    this.http.post('http://localhost:3000/remPhotoTag', {tags: this.remTags, id: this.selectedPhoto.id}).subscribe(res => {
      console.log(res);
      alert("Tags '"+this.remTags+"' success fully removed!");
      window.location.href = "http://localhost:4200/detail/"+this.selectedPhoto.id;
    });
  }

  submitComment(){
    console.log("submitComment");
    this.http.post('http://localhost:3000/subComment', {comment: this.comment, id: this.selectedPhoto.id}).subscribe(res => {
      console.log(res);
      window.location.href = "http://localhost:4200/detail/"+this.selectedPhoto.id;
    });
  }
}
