import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { Videographer } from './shared/models/videographer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.load_jwts();
    this.authService.check_token_fragment();
  }
}
