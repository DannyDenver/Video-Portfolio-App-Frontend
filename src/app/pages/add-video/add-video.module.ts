import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVideoComponent } from './add-video.component';
import { RouterModule } from '@angular/router';
import { AddEditVideoModule } from 'src/app/components/add-edit-video/add-edit-video.module';



@NgModule({
  declarations: [
    AddVideoComponent
  ],
  imports: [
    CommonModule,
    AddEditVideoModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddVideoComponent
      }
    ])
  ], 
  exports: [AddVideoComponent]
})
export class AddVideoModule { }
