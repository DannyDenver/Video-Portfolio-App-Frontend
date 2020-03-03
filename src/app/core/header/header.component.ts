import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loginURL: string;
  singupURL: string;
  logoutLink: string;
  usersPortfolio: boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    private location: Location) {
    this.loginURL = auth.build_login_link();
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.usersPortfolio = this.location.path().includes('your-portfolio');
    })
  }
}
