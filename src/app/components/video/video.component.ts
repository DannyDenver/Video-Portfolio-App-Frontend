import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/app/shared/models/video';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'video-card',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  @Input() showAvatar = true;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
