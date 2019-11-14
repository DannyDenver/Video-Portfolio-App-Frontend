import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, FormGroup, Validators } from '@angular/forms';
import { Videographer } from 'src/app/shared/models/videographer';
import { VideographerService } from 'src/app/services/videographer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
          private route: ActivatedRoute,
          private videoService: VideographerService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.videoService.getVideographer(name).subscribe((videogoo: Videographer) =>  {
        this.profileForm = this.fb.group({
          firstName: [videogoo.firstName, Validators.required],
          lastName: [videogoo.lastName, Validators.required],
          location: [videogoo.location, Validators.required],
          bio: [videogoo.bio, Validators.required],
          profilePictureUrl: [videogoo.profilePictureUrl, Validators.required]
        })
    })
  }else {
      this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      bio: ['', Validators.required],
      profilePictureUrl: ['', Validators.required]
    })
  }


  }

  onSubmit() {
    if (this.profileForm.valid) {
      const videogoo = new Videographer(null,
        this.getValue('firstName'),
        this.getValue('lastName'),
        this.getValue('location'),
        this.getValue('bio'),
        this.getValue('profilePictureUrl'))

        this.videoService.addVideographer(videogoo).subscribe(res => {
          console.log(res)
        })
    }
  }

  private getValue(field: string) {
    return this.profileForm.get(field).value.trim();
  }

}
