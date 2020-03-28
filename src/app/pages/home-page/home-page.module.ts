import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoComponent } from '../../components/video/video.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OwlModule } from 'ngx-owl-carousel';
import { VideographerCarouselComponent } from '../../components/videographer-carousel/videographer-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page.component';
import { VideoModule } from 'src/app/components/video/video.module';
import { VideosService } from 'src/app/services/videos.service';



@NgModule({
  declarations: [
    HomePageComponent,
    VideographerCarouselComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    OwlModule,
    VideoModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ])
  ],
  providers: [
    VideosService,
  ]
})
export class HomePageModule { }
