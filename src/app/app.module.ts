import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './core/header/header.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { VideosService } from './services/videos.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthErrorHandler } from './services/auth-error-handler';
import { BucketService } from './services/bucket.service';
import { ConfirmationDialog } from './core/confirmation-dialog/confirmation-dialog.component';
import { EmailService } from './services/email.service';
import { AuthInterceptor } from './interceptors/NotAuthorizedInterceptor';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConfirmationDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
