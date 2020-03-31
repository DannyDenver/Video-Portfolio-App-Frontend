import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallSpinnerComponent } from './small-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material';



@NgModule({
  declarations: [SmallSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ], 
  exports: [ SmallSpinnerComponent]
})
export class SmallSpinnerModule { }
