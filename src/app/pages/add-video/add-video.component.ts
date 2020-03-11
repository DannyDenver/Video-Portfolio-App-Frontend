import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef
  @ViewChild('videoUpload', { static: false }) videoUpload: ElementRef

  constructor() { }

}
