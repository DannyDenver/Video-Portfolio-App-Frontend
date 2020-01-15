import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './core/header/header.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { VideographerListComponent } from './pages/videographer-list/videographer-list.component';
import { MatListModule, MatListAvatarCssMatStyler } from '@angular/material/list';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AddVideoComponent } from './pages/add-video/add-video.component';
import { VideosService } from './services/videos.service';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthGuard } from './services/auth.guard';
import { AuthErrorHandler } from './services/auth-error-handler';
import { UsersPortfolioComponent } from './pages/users-portfolio/users-portfolio.component';
import { BucketService } from './services/bucket.service';
import { ConfirmationDialog } from './core/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PortfolioComponent,
    VideographerListComponent,
    EditProfileComponent,
    AddVideoComponent,
    UsersPortfolioComponent,
    ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    UsersService,
    AuthService,
    AuthGuard,
    BucketService,
    VideosService, {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
  ],
  entryComponents: [ConfirmationDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
