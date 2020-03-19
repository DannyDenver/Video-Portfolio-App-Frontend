import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditVideoComponent } from './add-edit-video.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddEditVideoComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    HttpClientModule
  ],
  exports: [ AddEditVideoComponent ]
})
export class AddEditVideoModule { }
