import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {

  private authMessageSource = new BehaviorSubject<Boolean>(false);
  currentAuth = this.authMessageSource.asObservable();

  constructor() { }

  changeAuth(status: Boolean){
    this.authMessageSource.next(status);
  }
}
