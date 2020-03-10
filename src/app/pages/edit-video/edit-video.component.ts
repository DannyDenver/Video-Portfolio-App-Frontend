import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from 'src/app/services/videos.service';
import { Video } from 'src/app/shared/models/video';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BucketService } from 'src/app/services/bucket.service';

@Component({
  selector: 'app-edit-video',
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videosService: VideosService,
    private bucketService: BucketService
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
        order: [{ value: video.order, disabled: video.order ? false : true }]
      });
    });
  }

  selectThumbnailPhoto($event) {
    $event.preventDefault()
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  removeThumbnailPhoto() {
    this.thumbnailPhoto = null;
  }

  onPictureSelect($event) {
    this.thumbnailPhoto = $event.target.files[0];
  }

  onSubmit() {
    if (this.videoForm.valid) {
      this.loading = true;
      const video = new Video(
        this.video.videographerId,
        this.getValue('title'),
        this.getValue('description'),
        this.video.id,
        this.getValue('genre'),
        this.videoForm.get("order").enabled ? this.getValue('order') : null
      )

      const observableArray = [this.videosService.editVideo(video)];

      if (this.thumbnailPhoto) {
        observableArray.push(this.videosService.addVideoThumbnail(video.id).pipe(switchMap((url: string) => this.bucketService.uploadFile(url, this.thumbnailPhoto))));
      }


      forkJoin(...observableArray).subscribe((url: string) => {
        this.router.navigate(['../../..'], { relativeTo: this.route })
      }, error => console.log,
      () => this.loading = false)
    }
  }

  toggleOrderPreference() {
    this.orderPreference != this.orderPreference;
    if (this.videoForm.get("order").disabled) {
      this.videoForm.get("order").enable();
    } else {
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
