import { Component, OnInit } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { ActivatedRoute, Router } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { VideosService } from 'src/app/services/videos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  videographer: Videographer;
  videographerName: string;
  name: string;
  editLink = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private videographerService: VideographerService,
    private videosService: VideosService,
    public auth: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.editLink = this.name + '/edit';
    this.videographerService.getVideographer(this.name).subscribe(videogoo => {
      
      this.videographer = videogoo
    });
  }

  editProfile() {
    this.router.navigate([name, 'edit'])
  }

  deletePortfolio() {
    this.videographerService.deleteVideographer(this.videographer.id).subscribe(res => {
      if (res['success'] == true) {
        this.router.navigate(['/']);
      }
    });
  }

  addVideo() {
    this.router.navigate([this.videographer.id, 'add-video'], { relativeTo: this.route })
  }

  removeVideo(id: number){
    this.videosService.deleteVideo(id).subscribe(() => {
      this.videographer.videos = this.videographer.videos.filter(x => x.id !== id);
    })
  }

  getVideoLink(url: string) {
    let dangerousVideoUrl = 'https://www.youtube.com/embed/' + url
    return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  }
}
