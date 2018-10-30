import { Component, OnInit} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { DataService} from './services/data.service';
interface UserResponse {
  data: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '500pxApp';
  userStatus: Boolean;
  constructor( private http: HttpClient, private dataService: DataService){
    
  }

  ngOnInit(){

    this.dataService.currentAuth.subscribe(status => this.userStatus = status)
  }


  makecall() {
    //var headers = new Headers();
    
    console.log("helo");
    //headers.append('Content-Type', 'application/X-www-form-urlencoded');

    // this.http.post('http://localhost:3000/authorize', {}).subscribe((res) =>{ 
    //     console.log("res:"+res);
    //     console.log("res: json string"+JSON.stringify(res));
        
    //     var _body = res["_body"];
    //     var json = JSON.parse(_body);
    //     var url = json.data;
    //     console.log("token: "+url);
    //     window.location.href = url;
    //   },
    //   (err) => {
    //     console.log("err"+err);
    //   } 
    // );
    this.http.get<UserResponse>('http://localhost:3000/authorize').subscribe( data => {
      console.log(data);
      var url = data.data
      window.location.href = url;
    },
    (err) => {
      console.log("err"+err);
    });
    
  }

  changeMeaasge(){
    console.log("changeMessage");
    this.dataService.changeAuth(false);
  }
  logout(){
    console.log("userStatus: "+this.userStatus);
    this.changeMeaasge();
    window.location.href = "http://localhost:4200"
  }
  // receiveMesaage($event){
  //   console.log("receiveMesaage");
  //   this.userAuthd = $event;
  // }
}
