import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, FormGroup, Validators } from '@angular/forms';
import { Videographer } from 'src/app/shared/models/videographer';
import { VideographerService } from 'src/app/services/videographer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  videogoo: Videographer;
  

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideographerService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.videoService.getVideographer(name).subscribe((videogoo: Videographer) => {
        this.videogoo = videogoo;
        this.profileForm = this.fb.group({
          firstName: [videogoo.firstName, Validators.required],
          lastName: [videogoo.lastName, Validators.required],
          location: [videogoo.location, Validators.required],
          bio: [videogoo.bio, Validators.required],
          profilePictureUrl: [videogoo.profilePictureUrl, Validators.required]
        })
      })
    } else {
      this.profileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        location: ['', Validators.required],
        bio: ['', Validators.required],
        profilePictureUrl: ['', Validators.required]
      })
    }
  }

  cancelEdits() {
    this.router.navigate(name)
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const videogoo = new Videographer(null,
        this.getValue('firstName'),
        this.getValue('lastName'),
        this.getValue('location'),
        this.getValue('bio'),
        this.getValue('profilePictureUrl'))

      if (this.videogoo) {
        videogoo.id = this.videogoo.id
        this.videoService.patchVideographer(videogoo).subscribe(res => {
          console.log(res)
          this.router.navigate(['../'], { relativeTo: this.route })
        })
      } else {
        this.videoService.addVideographer(videogoo).subscribe(res => {
          console.log(res)
          this.router.navigate(['/'])
        })
      }
    }
  }

  private getValue(field: string) {
    return this.profileForm.get(field).value.trim();
  }

}
