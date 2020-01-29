import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { VideosService } from 'src/app/services/videos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from 'src/app/shared/models/video';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  emailForm: FormGroup;
  videographer: Videographer;
  videographerName: string;
  videos: Video[];
  name: string;
  subscribed: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videographerService: VideographerService,
    private videosService: VideosService,
    public auth: AuthService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('name'))).subscribe(name => {
      if (name === 'your-portfolio') {
        this.name = this.auth.activeUserId();
      } else {
        this.name = name;
      }
  
  
      this.videographerService.getVideographer(this.name).subscribe(videogoo => {
        this.videographer = videogoo
      });
  
      this.videosService.getVideos(this.name).subscribe((videos: Video[]) => {
        this.videos = videos;
      });
  
      this.emailForm = this.fb.group({
        email: ["", Validators.required]
      })
    })
  }

  deletePortfolio() {
    this.videographerService.deleteVideographer(this.videographer.id).subscribe(res => {
      if (res['success'] == true) {
        this.router.navigate(['/']);
      };
    });
  };

  removeVideo(video: Video, $event) {
    $event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: {
        question: `Are you sure you would like to delete ${video.title}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.auth.activeUserId();
        this.videosService.deleteVideo(userId, video.id).subscribe((deletedUrl: string) => {
          this.videos = this.videos.filter(vid => vid.id !== video.id);
        })
      }
    });
  };

  getVideoLink(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  };

  subscribeToPortfolio() {
    const emailAddress = this.emailForm.get('email').value.trim();
    this.emailService.verifyEmail(this.name, emailAddress).subscribe(subscribed => this.subscribed = subscribed);
  }
}
