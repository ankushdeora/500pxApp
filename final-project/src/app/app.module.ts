import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule} from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { DataService } from './services/data.service';
import { PhotoService } from './services/photo.service';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
//for two-way binding ngModel is required
import { FormsModule } from '@angular/forms';
//pipes
import { ConditionPipe } from "./pipe/sort-by.pipe";
import { HomeComponent } from './home/home.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    UserProfileComponent,
     ImageDetailComponent,
     SearchComponent,
     SearchResultComponent,
     ConditionPipe,
     HomeComponent,
     UploadPhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ DataService, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
