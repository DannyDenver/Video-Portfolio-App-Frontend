import { Component, OnInit } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';
import { VideosService } from 'src/app/services/videos.service';
import { Video } from 'src/app/shared/models/video';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  videographers: Videographer[] = [];
  loading = true;
  loadingVideos = false;
  videos: Video[];
 
  constructor(
    public auth: AuthService,
    private videographerService: VideographerService,
    private videosService: VideosService) { }

  ngOnInit() {
    this.videographerService.getVideographers()
      .subscribe(response => {
        this.videographers = response as Videographer[];
        this.loading = false;
      });

      this.videosService.getVideos().subscribe((res) => {
        this.videos = res.videos as Video[];
      })
  }

  deletePortfolio(id: string, index: number) {
    this.videographerService.deleteVideographer(id).subscribe(res => {
      if (res['success'] == true) {
        this.videographers.splice(index, 1);
      }
    });
  }

  onScroll() {
    if(this.videos){
      this.loadingVideos = true;
      this.videosService.getVideos(this.videos[this.videos.length - 1]).subscribe((res) => {
        let newVideos = res.videos as Video[];
        this.videos.push(...newVideos);
      }, (error) => console.log, () => this.loadingVideos = false);
    }
  }
}
