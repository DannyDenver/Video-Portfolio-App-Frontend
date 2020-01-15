import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { ActivatedRoute, Router } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { VideosService } from 'src/app/services/videos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from 'src/app/shared/models/video';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  videographer: Videographer;
  videographerName: string;
  videos: Video[];
  name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videographerService: VideographerService,
    private videosService: VideosService,
    public auth: AuthService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.route.snapshot.routeConfig.path.includes('your-portfolio')) {
      this.name = this.auth.activeUserId();
    } else {
      this.name = this.route.snapshot.paramMap.get('name');
    }

    this.videographerService.getVideographer(this.name).subscribe(videogoo => {
      this.videographer = videogoo
      this.cd.detectChanges();
    });

    this.videosService.getVideos(this.name).subscribe((videos: Video[]) => {
      this.videos = videos;
      this.cd.detectChanges();
    });
  }

  editProfile() {
    this.router.navigate([name, 'edit']);
  };

  deletePortfolio() {
    this.videographerService.deleteVideographer(this.videographer.id).subscribe(res => {
      if (res['success'] == true) {
        this.router.navigate(['/']);
      };
    });
  };

  addVideo() {
    this.router.navigate([this.videographer.id, 'add-video'], { relativeTo: this.route });
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
}
