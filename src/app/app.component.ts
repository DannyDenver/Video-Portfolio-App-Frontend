import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { Videographer } from './shared/models/videographer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  greeting = "";
  videographers: Videographer[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getGreeting().subscribe(greeting => this.greeting = greeting)

    this.videographers = [new Videographer('Brad', 'Taylor', 'Tallahassee, FL', 'Videographer at FSU', null),
    new Videographer('Daniel', 'Taylor', 'Denver, Co', 'Videographer in Denver', null),
    new Videographer('Michael', 'Bubley', 'LA, CA', 'Videographer in LA', null),
    new Videographer('Arnold', 'Schwarz', 'SF, CA', 'Videographer in SF', null)
  ]

  }
  title = 'video-portfolio-app';
}
