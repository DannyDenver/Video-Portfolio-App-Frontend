import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';
import { Videographer } from 'src/app/shared/models/videographer';
import { BucketService } from 'src/app/services/bucket.service';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  profileForm: FormGroup;
  videogoo: Videographer;
  file: File;
  loading = false;
  showProfilePicError = false;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videographerService: VideographerService,
    public authService: AuthService,
    private bucketService: BucketService,
    private ng2ImgMaxService: Ng2ImgMaxService) { }

  ngOnInit() {
    const userId = this.authService.activeUserId();

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  selectPhoto($event) {
    $event.preventDefault()
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  removePhoto() {
    this.file = null;
  }

  onPictureSelect($event) {
    this.ng2ImgMaxService.resizeImage($event.target.files[0],300, 300).subscribe(result => this.file = result);
    this.showProfilePicError = false;
  }

  async onSubmit() {
    if (!this.file) {
      this.showProfilePicError = true;
      return;
    } else {
      this.showProfilePicError = false;
    }

    if (this.profileForm.valid) {
      this.loading = true;

      const videogoo = new Videographer(null,
        this.getValue('firstName'),
        this.getValue('lastName'),
        this.getValue('location'),
        this.getValue('bio'),
        null);

      this.videographerService.postVideographer(videogoo).pipe(switchMap((val) => {
        return this.videographerService.addProfilePicture()
      }),
        switchMap((url: string) => this.bucketService.uploadFile(url, this.file))
      ).subscribe(() => this.navigateAway(), (error) => this.handleSubmitError(error));
    }
  }

  private handleSubmitError(error) {
    this.loading = false;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 403) {
        this.router.navigate(['login']);
      }
    }
  }

  private navigateAway() {
    this.loading = false
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private getValue(field: string) {
    return this.profileForm.get(field).value.trim();
  }
}
