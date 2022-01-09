import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateProfileComponent } from './create-profile.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { HttpClientModule } from '@angular/common/http';
import { BucketService } from 'src/app/services/bucket.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule, MatSelectModule } from '@angular/material';

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
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateProfileComponent
      }
    ])
  ],
  providers: [
    BucketService
  ]
})
export class CreateProfileModule { }
