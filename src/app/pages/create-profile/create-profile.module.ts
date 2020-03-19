import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProfileComponent } from './create-profile.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';



@NgModule({
  declarations: [CreateProfileComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateProfileComponent
      }
    ])
  ]
})
export class CreateProfileModule { }
