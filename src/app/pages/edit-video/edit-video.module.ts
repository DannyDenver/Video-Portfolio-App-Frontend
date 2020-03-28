import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddEditVideoModule } from 'src/app/components/add-edit-video/add-edit-video.module';
import { EditVideoComponent } from './edit-video.component';
import { HttpClientModule } from '@angular/common/http';
import { BucketService } from 'src/app/services/bucket.service';
import { VideosService } from 'src/app/services/videos.service';



@NgModule({
  declarations: [
    EditVideoComponent
  ],
  imports: [
    CommonModule,
    AddEditVideoModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditVideoComponent
      }
    ])
  ],
  providers: [
    BucketService,
    VideosService
  ],
  exports: [EditVideoComponent]
})
export class EditVideoModule { }
