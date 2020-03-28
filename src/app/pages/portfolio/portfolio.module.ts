import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VideoModule } from 'src/app/components/video/video.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';
import { VideosService } from 'src/app/services/videos.service';

@NgModule({
  declarations: [
    PortfolioComponent,
    ConfirmationDialog,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    VideoModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    NgxIntlTelInputModule,
    BsDropdownModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: PortfolioComponent
      }
    ])
  ],
  providers: [
    VideosService
  ],
  entryComponents: [ConfirmationDialog],
})
export class PortfolioModule { }
