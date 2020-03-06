import { Component, OnInit, Input, Output } from '@angular/core';
import { Video } from 'src/app/shared/models/video';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'video-card',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  @Input() showAvatar = true;
  @Output() removeVideoEvent: EventEmitter = new EventEmitter();

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  removeVideo(video, $event) {
    $event.preventDefault();
    this.removeVideoEvent.emit(video);
  }
}
