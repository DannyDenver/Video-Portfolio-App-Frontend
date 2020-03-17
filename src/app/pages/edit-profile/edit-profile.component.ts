import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Videographer } from 'src/app/shared/models/videographer';
import { VideographerService } from 'src/app/services/videographer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BucketService } from 'src/app/services/bucket.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Portfolio } from 'src/app/shared/models/portfolio';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  videogoo: Videographer;
  file: File;
  coverPhotoFile: File;
  loading = false;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef
  @ViewChild('coverPhotoUpload', { static: false }) coverPhotoUpload: ElementRef

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videographerService: VideographerService,
    private authService: AuthService,
    private bucketService: BucketService) { }

  ngOnInit() {
    const userId = this.authService.activeUserId();

    this.videographerService.getPortfolio(userId).subscribe((portfolio: Portfolio) => {
      const videogoo = portfolio.profile;
      if (videogoo == null) return;
      this.videogoo = videogoo;
      this.profileForm = this.fb.group({
        firstName: [videogoo.firstName, Validators.required],
        lastName: [videogoo.lastName, Validators.required],
        location: [videogoo.location, Validators.required],
        bio: [videogoo.bio, Validators.required],
      })
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
    this.file = $event.target.files[0];
  }

  selectCoverPhoto($event) {
    $event.preventDefault();
    if (this.coverPhotoUpload) {
      this.coverPhotoUpload.nativeElement.click();
    }
  }

  removeCoverPhoto() {
    this.coverPhotoFile = null;
  }

  onCoverPhotoSelect($event) {
    this.coverPhotoFile = $event.target.files[0];
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      const videogoo = new Videographer(null,
        this.getValue('firstName'),
        this.getValue('lastName'),
        this.getValue('location'),
        this.getValue('bio'),
        null);

      if (this.videogoo && this.videogoo.id === this.authService.activeUserId()) {
        videogoo.id = this.videogoo.id;
        this.loading = true;

        const observablesArray = [this.videographerService.patchVideographer(videogoo)];

        if(this.coverPhotoFile) {
          observablesArray.push(this.videographerService.addCoverPhoto().pipe(switchMap((url: string) => this.bucketService.uploadFile(url, this.coverPhotoFile))));
        }

        if (this.file) {
          observablesArray.push(this.videographerService.addProfilePicture().pipe(switchMap((url: string) =>
            this.bucketService.uploadFile(url, this.file))));
        }

        forkJoin(...observablesArray).subscribe((res) => {
          console.log(res);
          this.navigateAway()
        });
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
