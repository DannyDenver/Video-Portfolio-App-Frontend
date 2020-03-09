import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BucketService } from 'src/app/services/bucket.service';
import { Video } from 'src/app/shared/models/video';
import { VideosService } from 'src/app/services/videos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  videogooId: string;
  videoForm: FormGroup;
  file: File;
  uploading = false;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideosService,
    private bucketService: BucketService,
    private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.videogooId = this.authService.activeUserId();
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  selectVideo(event) {
    event.preventDefault()
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  removeVideo(event) {
    event.preventDefault()

    this.file = null;
  }

  onVideoSelect(event) {
    this.file = event.target.files[0]
  }

  onSubmit() {
    if (this.videoForm.valid) {
      this.uploading = true;
      const video = new Video(
        this.videogooId,
        this.getValue('title'),
        this.getValue('description')
      )
      this.videoService.addVideo(video).subscribe((url: string) => {
        this.bucketService.uploadFile(url, this.file).subscribe(() => {
          this.uploading = false;
          this.router.navigate(['../'], { relativeTo: this.route })
        })
      })
    }
  }

  private getValue(field: string) {
    return this.videoForm.get(field).value.trim();
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
