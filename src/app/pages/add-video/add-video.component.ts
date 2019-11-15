import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';
import { Video } from 'src/app/shared/models/video';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  videogooName: string;
  videogooID: number;
  videoForm: FormGroup


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideosService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name').split('-')
    this.videogooName = this.capitalize(name[0]) + " " + this.capitalize(name[1]);
    this.createForm();
  }

  createForm() {
    this.videogooID = +this.route.snapshot.paramMap.get('id')
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
    })
  }


  onSubmit() {
    if (this.videoForm.valid) {
      const video = new Video(
        this.videogooID,
        this.getValue('url'),
        this.getValue('title'),
        this.getValue('description')
      )
      this.videoService.addVideo(video).subscribe(res => {
        this.router.navigate(['../..'], {relativeTo: this.route})
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
