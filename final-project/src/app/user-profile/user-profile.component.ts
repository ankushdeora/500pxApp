import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';

import { UserDetails } from '../models/UserDetails'
import { DataService } from '../services/data.service'; 
import { Photo } from '../models/Photo';
import { PhotoVotes } from '../models/PhotoVotes';
import { PHOTOS } from '../models/RecPhotos';

interface responseData {
  photos: Photo[]
}


interface photoLikesData{
  users: PhotoVotes[];
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  userStatus : Boolean;
  authUserDetails: UserDetails = new UserDetails();
  userPhotos: Photo[] = new Array<Photo>();


  selectedPhoto: Photo;
  selectedPhotoLikes: PhotoVotes[] = new Array<PhotoVotes>();
  //userPhotos = [1,2,3,4];
  delIDPhoto: number = 1;

  namePhotoUL: string;
  disPhotoUL: string;
  pathPhotoUL: string;
  formdataPhotoUL: FormData;

  constructor(private http: HttpClient, private dataService: DataService) { }


  ngOnInit() {
    this.dataService.currentAuth.subscribe(status => this.userStatus = status);
    this.getAuthUser();
    this.getUserPhotos();

  }

  changeMeaasge(){
    console.log("changeMessage");
    this.dataService.changeAuth(true);
  }

  onSelect(photo: Photo){
    this.selectedPhoto = photo;
    this.getPhotoLikes(this.selectedPhoto.id);
  }

  getAuthUser(){
    
    this.http.get<UserDetails>('http://localhost:3000/users').subscribe(res =>{ 
      console.log(res);
      this.authUserDetails.fullname = res.fullname;
      this.authUserDetails.followers_count = res.followers_count;
      this.authUserDetails.userpic_url = res.userpic_url;
      this.authUserDetails.friends_count = res.friends_count;
      if(res.id>0){
        //this.changeMeaasge();
      }
      },
      (err) => {
        console.log("err"+err);
      } 
    );
  }

getUserPhotos(){
    this.http.get<responseData>('http://localhost:3000/usersPhotos').subscribe(res => {
      console.log(res.photos);
      this.userPhotos = res.photos;
      console.log(this.userPhotos[1].images);
      //console.log("images: "this.userPhotos.ima)
      // this.userPhotos.id = res.id;
      // this.userPhotos.user_id = res.user_id;
      // this.userPhotos.name = res.name;
      // this.userPhotos.description = res.description;
      this.populatePHOTOS();
    });
  }

  //
  populatePHOTOS(){
    this.userPhotos.forEach(function(p){
      PHOTOS.push(p);
    });

    console.log(PHOTOS);
  }

  getPhotoLikes(idNum: number){
    this.http.post<photoLikesData>('http://localhost:3000/photoLikes', {id:idNum}).subscribe(res => {
      console.log(res);
      this.selectedPhotoLikes = res.users;
      console.log(this.selectedPhotoLikes);
    });
  }



  deletePhoto(){
    console.log("deletePhoto");
    this.http.post('http://localhost:3000/photoDelete', {id :this.delIDPhoto}).subscribe(res => {
      console.log("deleteRes: "+res);
    });
  }

  remPhotoTag(){
    console.log("remPhotoTag");
    this.http.get('http://localhost:3000/remPhotoTag').subscribe(res => {
      console.log("remPhotoTag res: "+res);
    });
  }

  addPhotoTag(){
    console.log("addPhotoTag");
    this.http.get('http://localhost:3000/addPhotoTag').subscribe(res => {
      console.log("addPhotoTag res: "+res);
    });
  }
  
  uploadPhoto(){
    console.log("uploadPhoto");
    this.http.post('http://localhost:3000/uploadPhoto',{formData: this.formdataPhotoUL}).subscribe(res => {
      console.log("addPhotoTag res: "+res);
    });
  }

  selectFile(){
    console.log("selectFile");
    const files: FileList = this.fileInput.nativeElement.files;
    // const myElement: HTMLElement = document.getElementById('fileInput');
    // var value = myElement.nodeValue;
    //console.log("value :"+value);
    var reader  = new FileReader();
    if (files.length === 0) { 
      return; 
    };
    reader.readAsDataURL(files[0]);
    const formData = new FormData();
    formData.append("file", files[0].name);
    this.formdataPhotoUL = formData;
    console.log("reader: "+reader.result);
    //var tmppath = window.URL.createObjectURL(files[0]);
    //this.pathPhotoUL = tmppath;
    //console.log("file name: "+files[0]+" file path:"+tmppath);
  }

}
