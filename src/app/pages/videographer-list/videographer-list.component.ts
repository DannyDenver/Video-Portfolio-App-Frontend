import { Component, OnInit } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-videographer-list',
  templateUrl: './videographer-list.component.html',
  styleUrls: ['./videographer-list.component.scss']
})
export class VideographerListComponent implements OnInit {
  greeting = "";
  videographers: Videographer[] = [];
  title = 'video-portfolio-app';
  loading = true;

  constructor(
    public auth: AuthService,
    private videographerService: VideographerService) { }

  ngOnInit() {
    this.videographerService.getVideographers().pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.videographers = response as Videographer[]
      });
  }

  deletePortfolio(id: string, index: number) {
    this.videographerService.deleteVideographer(id).subscribe(res => {
      if (res['success'] == true) {
        this.videographers.splice(index, 1)
      }
    })
  }

  usersVideographers() {
    return this.videographers.filter(x => x.createdBy === this.auth.payload.sub)
  }

  otherVideographers() {
    return this.videographers.filter(x => x.createdBy !== this.auth.payload.sub)
  }

  getLink(vg: Videographer) {
    return vg.id;
  }
}
