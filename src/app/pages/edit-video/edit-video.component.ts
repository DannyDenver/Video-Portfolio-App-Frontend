import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from 'src/app/services/videos.service';
import { Video } from 'src/app/shared/models/video';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  video: Video;
  videoForm: FormGroup;
  orderPreference: boolean;
  thumbnailPhoto: File;
  loading = false;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef

  constructor(
    private route: ActivatedRoute,
    private videosService: VideosService,
  ) { }

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');

    this.videosService.getVideo(videoId).subscribe(video => {
      this.video = video;
    });
  }
}
