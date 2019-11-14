import { Component, OnInit } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { UsersService } from 'src/app/services/users.service';
import { VideographerService } from 'src/app/services/videographer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-videographer-list',
  templateUrl: './videographer-list.component.html',
  styleUrls: ['./videographer-list.component.scss']
})
export class VideographerListComponent implements OnInit {
  greeting = "";
  videographers: Videographer[] = [];
  title = 'video-portfolio-app';

  constructor(private usersService: UsersService,
    private auth: AuthService,
    private videographerService: VideographerService) {}

  ngOnInit() {
    // this.usersService.getGreeting().subscribe(greeting => this.greeting = greeting)

    this.videographerService.getVideographers().subscribe(videogoos => this.videographers = videogoos);
  }

  getLink(vg: Videographer) {
    return vg.firstName.toLowerCase() + '-' + vg.lastName.toLowerCase();
  }
}
