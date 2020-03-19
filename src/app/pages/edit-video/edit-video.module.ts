import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddEditVideoModule } from 'src/app/components/add-edit-video/add-edit-video.module';
import { EditVideoComponent } from './edit-video.component';



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
  exports: [EditVideoComponent]
})
export class EditVideoModule { }
