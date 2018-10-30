import { Injectable } from '@angular/core';
import { PHOTOS } from '../models/RecPhotos'; 
import { Photo } from '../models/Photo';

@Injectable()
export class PhotoService {

  constructor() { }

  serachImage(id: number): Photo {
    var passPhoto: Photo = null;
    PHOTOS.forEach(function (photo){
      if(photo.id === id){
        passPhoto = photo;
        return;
      }
    });
    return passPhoto;
  }
}
