import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import 'rxjs/add/operator/filter';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http/src/params';
import { Photo } from '../models/Photo';
import { ConditionPipe } from '../pipe/sort-by.pipe';

interface SearchResponse {
  current_page: String;
  photos: Array<Photo>;
}


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  sub;
  photos: Photo[];
  searchTerm: string;
  selectedPipe: string = "artist";
  page: number = 1;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    console.log("test1");
    this.sub = this.route.queryParams
    .subscribe(params => {
      console.log("test");
      console.log(params.term);
      this.searchTerm = params.term;
      if(this.searchTerm!=null){
        this.searchPhoto();
      }
    });
    
  }

  searchPhoto(){
    this.http.post<SearchResponse>('http://localhost:3000/search', {term : this.searchTerm, page: this.page}).subscribe(res => {
      console.log(res.photos);
      this.photos = res.photos;
      for(var i = 0; i < res.photos.length; i++){
        var mydate = new Date(res.photos[i].created_at);
        //console.log(mydate+" type: "+typeof(mydate)+ " getDate(): "+mydate.getTime());
        //console.log("before: "+data.photos[i].created_at_date);
        res.photos[i].created_at_date = mydate;
        //console.log("after: "+data.photos[i].created_at_date);
        //console.log("type"+i+": "+typeof(i));
      }
      console.log("type: "+typeof(this.photos[1].created_at_date)+" value: "+this.photos[1].created_at_date.getDate()); 
      
    });
  }

  nextPage(){
    this.page++;
    console.log("next: "+this.page);
    this.searchPhoto();
  }

  prePage(){
    this.page--;
    console.log("pre: "+this.page);
    this.searchPhoto();
  }
  
  sortBy(value){
    console.log(value);
    switch(value){
      case "artist":
        this.selectedPipe = "artist";
        break;
      case "year":
        this.selectedPipe = "year";
        break;
      case "title":
        this.selectedPipe = "title";
        break;
      default:
        this.selectedPipe = "artist"; 
    }
  }
  

}
