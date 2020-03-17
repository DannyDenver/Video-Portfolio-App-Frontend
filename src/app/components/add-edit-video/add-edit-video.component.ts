import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from 'src/app/services/videos.service';
import { Video } from 'src/app/shared/models/video';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BucketService } from 'src/app/services/bucket.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'add-edit-video',
  templateUrl: './add-edit-video.component.html',
  styleUrls: ['./add-edit-video.component.scss']
})
export class AddEditVideoComponent implements OnChanges, OnInit {
  @Input() video: Video;
  @Input() newVideo: boolean;
  videoForm: FormGroup;
  orderPreference: boolean;
  thumbnailPhoto: File;
  videoFile: File;
  loading = false;
  videographerId: string;
  showFileSizeWarning = '';

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef
  @ViewChild('videoUpload', { static: false }) videoUpload: ElementRef

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videosService: VideosService,
    private bucketService: BucketService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.newVideo) {
      this.createForm();
    }
  }

  createForm() {
    this.videographerId = this.authService.activeUserId();
    this.orderPreference = false;
    
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: [''],
      order: [{ value: null, disabled: true }]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
      if(this.video) {
        this.orderPreference = this.video.order ? true : false;

        this.videoForm = this.fb.group({
          title: [this.video.title, Validators.required],
          description: [this.video.description, Validators.required],
          genre: [this.video.genre],
          order: [{ value: this.video.order, disabled: this.video.order ? false : true }]
        });
      }
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

  selectVideo($event) {
    $event.preventDefault()
    if (this.videoUpload)
      this.videoUpload.nativeElement.click();
  }

  removeVideo($event) {
    event.preventDefault()

    this.videoFile = undefined;
  }

  onVideoSelect(file) {
    this.videoFile = file
  }

  onSubmit() {
    if (this.newVideo && this.videoFile.size > 2000000000) {
      this.showFileSizeWarning = `Video is size ${this.videoFile.size} bytes cannot exceed 2 gigabytes.` ;
      return;
    }

    this.showFileSizeWarning = '';

    if (this.videoForm.valid) {
      if (this.newVideo) {
        this.loading = true;

        const video = new Video(
          this.videographerId,
          this.getValue('title'),
          this.getValue('description'),
          null,
          this.getValue('genre'),
          this.videoForm.get("order").enabled ? this.getValue('order') : null
        );

        this.videosService.addVideo(video).pipe(switchMap((url: string) => this.bucketService.uploadFile(url, this.videoFile))).subscribe(() => {
            this.loading = false;
            this.router.navigate(['../'], { relativeTo: this.route })
          });
      }else {
        this.loading = true;
        const video = new Video(
          this.video.videographerId,
          this.getValue('title'),
          this.getValue('description'),
          this.video.id,
          this.getValue('genre'),
          this.videoForm.get("order").enabled ? this.getValue('order') : null
        );
  
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
