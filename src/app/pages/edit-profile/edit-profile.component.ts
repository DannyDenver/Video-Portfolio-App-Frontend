import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, FormGroup, Validators } from '@angular/forms';
import { Videographer } from 'src/app/shared/models/videographer';
import { VideographerService } from 'src/app/services/videographer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private videoService: VideographerService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      bio: ['', Validators.required],
      profilePictureUrl: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const videogoo = new Videographer(null,
        this.profileForm.get('firstName').value,
        this.profileForm.get('lastName').value,
        this.profileForm.get('location').value,
        this.profileForm.get('bio').value,
        this.profileForm.get('profilePictureUrl').value)

        this.videoService.addVideographer(videogoo).subscribe(res => {
          console.log(res)
        })
    }
  }
}
