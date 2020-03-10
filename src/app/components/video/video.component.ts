import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Video } from 'src/app/shared/models/video';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'video-card',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  @Input() showAvatar = true;
  @Output() removeVideoEvent: EventEmitter<Video> = new EventEmitter();
  showingVideo = false;
  @ViewChild('videoPlayer', { static: true }) public videoPlayer: ElementRef;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (!this.video.thumbnailUrl) this.showingVideo = true;
   }

  removeVideo(video, $event) {
    $event.preventDefault();
    this.removeVideoEvent.emit(video);
  }

  getLink(id: string) {
    return id;
  }

  showVideo() {
    this.showingVideo = true;
    this.videoPlayer.nativeElement.play();
  }
}
