import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { VideosService } from 'src/app/services/videos.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Video } from 'src/app/shared/models/video';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { map } from 'rxjs/operators';
import { Portfolio } from 'src/app/shared/models/portfolio';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  phoneNumberForm: FormGroup;
  videographer: Videographer;
  videographerName: string;
  videos: Video[];
  name: string;
  subscribed: boolean;
  backgroundUrl: SafeStyle;

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videographerService: VideographerService,
    private videosService: VideosService,
    public auth: AuthService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('name'))).subscribe(name => {
      this.videographerService.getVideographer(name).subscribe((portfolio: Portfolio) => {
        if (portfolio && portfolio.profile) {
          this.videographer = portfolio.profile;
          if (this.videographer.coverPhoto) {
            this.backgroundUrl = this.sanitization.bypassSecurityTrustStyle(`url(${this.videographer.coverPhoto})`);
          }else {
            this.backgroundUrl = this.sanitization.bypassSecurityTrustStyle(`url(https://inspirationfeed.com/wp-content/uploads/2017/03/Man-Picking-up-gopro-camera-on-tripod-1.jpg)`);
          }
          
          this.videos = portfolio.videos.sort((a, b) => (a.order != null ? a.order : Infinity) - (b.order != null ? b.order : Infinity));
        }else {
          this.router.navigate(['./create'], { relativeTo: this.route })
        }
      });
  
      this.phoneNumberForm = this.fb.group({
        phoneNumber: [undefined, Validators.required]
      })
    });
  }

  deletePortfolio() {
    this.videographerService.deleteVideographer(this.videographer.id).subscribe(res => {
      if (res['success'] == true) {
        this.router.navigate(['/']);
      };
    });
  };

  removeVideo(video: Video) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: {
        question: `Are you sure you would like to delete ${video.title}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.auth.activeUserId();
        this.videosService.deleteVideo(userId, video.id).subscribe(() => {
          this.videos = this.videos.filter(vid => vid.id !== video.id);
        })
      }
    });
  };

  getVideoLink(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  };

  subscribeToPortfolio() {
    if(this.phoneNumberForm.controls['phoneNumber'].valid) {
      const phoneNumber = this.phoneNumberForm.get('phoneNumber').value.internationalNumber.replace(/\-/g, '').replace(/ /g,'');
      this.phoneNumberForm.reset();
      this.videographerService.subscribeToPortfolio(this.videographer, phoneNumber).subscribe(subscribed => {
        this.subscribed = subscribed});
    }
  }

   ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
    if (control.value && control.value.length != 12) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }
}
