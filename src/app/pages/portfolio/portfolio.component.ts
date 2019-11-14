import { Component, OnInit } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { ActivatedRoute, Router } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  videographer: Videographer;
  videographerName: string;
  editLink = "";

  constructor(private route: ActivatedRoute, private router: Router, private videographerService: VideographerService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    this.editLink = name +'/edit';
    this.videographerService.getVideographer(name).subscribe(videogoo => this.videographer = videogoo);
  }

  editProfile() {
    this.router.navigate([name, 'edit'])
  }

}
