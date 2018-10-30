import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  url:string;

  pathPhotoUL: string;
  formdataPhotoUL: FormData;
  fileUL:File

  name:string;
  description:string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        //console.log(event.target.result);
        this.url = event.target.result;
      }
      console.log(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadPhoto(){
    console.log("uploadPhoto");
    this.http.post('http://localhost:3000/uploadPhoto',{path: this.pathPhotoUL, name: this.name, description: this.description}).subscribe(res => {
      console.log("addPhotoTag res: "+res);
    });
  }

  selectFile(event:any){
    console.log("selectFile");
    const files: FileList = this.fileInput.nativeElement.files;
    // const myElement: HTMLElement = document.getElementById('fileInput');
    // var value = myElement.nodeValue;
    //console.log("value :"+value);
    var reader  = new FileReader();
    reader.onload = (event:any) => {
      //console.log(event.target.result);
      this.url = event.target.result;
    }

    if (files.length === 0) {
      return;
    };
    reader.readAsDataURL(files[0]);
    const formData = new FormData();
    //formData.append("file", files[0].name);

    var tmppath = window.URL.createObjectURL(files[0]);
    this.pathPhotoUL = files[0].name;
    console.log("file: "+files[0]+" file path:"+tmppath);
    formData.append("file", files[0]);
    console.log(formData);
    this.formdataPhotoUL = formData;
    //this.fileUL = files[0];
  }
}
