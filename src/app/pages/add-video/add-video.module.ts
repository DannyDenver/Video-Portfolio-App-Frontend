import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVideoComponent } from './add-video.component';
import { RouterModule } from '@angular/router';
import { AddEditVideoModule } from 'src/app/components/add-edit-video/add-edit-video.module';
import { HttpClientModule } from '@angular/common/http';
import { BucketService } from 'src/app/services/bucket.service';
import { VideosService } from 'src/app/services/videos.service';



@NgModule({
  declarations: [
    AddVideoComponent
  ],
  imports: [
    CommonModule,
    AddEditVideoModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddVideoComponent
      }
    ])
  ],
  providers: [
    BucketService,
    VideosService,
  ],
  exports: [AddVideoComponent]
})
export class AddVideoModule { }
