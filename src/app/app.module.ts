import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthGuard } from './guards/auth.guard';
import { AuthErrorHandler } from './services/auth-error-handler';
import { BucketService } from './services/bucket.service';
import { ConfirmationDialog } from './core/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditVideoComponent } from './pages/edit-video/edit-video.component';
import { EmailService } from './services/email.service';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { AuthInterceptor } from './interceptors/NotAuthorizedInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PortfolioComponent,
    VideographerListComponent,
    EditProfileComponent,
    AddVideoComponent,
    ConfirmationDialog,
    EditVideoComponent,
    CreateProfileComponent
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
    AuthService,
    AuthGuard,
    BucketService,
    VideosService,
    EmailService, {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [ConfirmationDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
