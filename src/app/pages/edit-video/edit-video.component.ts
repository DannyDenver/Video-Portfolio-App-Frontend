import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from 'src/app/services/videos.service';
import { Video } from 'src/app/shared/models/video';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  video: Video;
  videoForm: FormGroup;
  orderPreference: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videosService: VideosService
  ) { }

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');

    this.videosService.getVideo(videoId).subscribe(video => {
      this.video = video;
      this.orderPreference = video.order ? false : true;

      this.videoForm = this.fb.group({
        title: [video.title, Validators.required],
        description: [video.description, Validators.required],
        genre: [video.genre],
        order: [{ value : video.order, disabled: video.order ? false : true}]
      });
    });
  }

  onSubmit() {
    if (this.videoForm.valid) {
      const video = new Video(
        this.video.videographerId,
        this.getValue('title'),
        this.getValue('description'),
        this.video.id,
        this.getValue('genre'),
        this.videoForm.get("order").enabled ? this.getValue('order') : null
      )
      this.videosService.editVideo(video).subscribe((url: string) => {
        this.router.navigate(['../../..'], { relativeTo: this.route })
      })
    }
  }

  toggleOrderPreference() {
    this.orderPreference != this.orderPreference;
    if (this.videoForm.get("order").disabled) {
      this.videoForm.get("order").enable();
    }else {
      this.videoForm.get("order").disable();
    }
  }

  private getValue(field: string) {
    if (this.videoForm.get(field).value === null || this.videoForm.get(field).value === '') return null;
    if (typeof this.videoForm.get(field).value == 'string') {
      return this.videoForm.get(field).value.trim();
    }

    return this.videoForm.get(field).value
  }
}
