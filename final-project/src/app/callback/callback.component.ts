import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {



  constructor(private http: HttpClient) { }

  ngOnInit() {

    console.log(window.location.href);
    let url = window.location.href;
    let tokenAnd = url.indexOf("?");
    let tokens = url.substr(tokenAnd+1);
    console.log(tokens);
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('http://localhost:3000/access_token', tokens, {headers: new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded'),}).subscribe((res) =>{
      console.log("res:"+res);
      window.location.href = "http://localhost:4200/home";
      },
      (err) => {
        console.log("err"+err);
      }
    );
  }

  // changeMeaasge(){
  //   console.log("changeMessage");
  //   this.dataService.changeAuth(true);
  // }

  // getAuthUser(){

  //   this.http.get<UserDetails>('http://localhost:3000/users').subscribe(res =>{
  //     console.log(res.firstname);
  //     if(res.id>0){
  //       this.changeMeaasge();
  //     }
  //     },
  //     (err) => {
  //       console.log("err"+err);
  //     }
  //   );
  // }

}
