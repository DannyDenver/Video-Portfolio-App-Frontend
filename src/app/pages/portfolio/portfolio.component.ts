import { Component, OnInit } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { ActivatedRoute } from '@angular/router';
import { VideographerService } from 'src/app/services/videographer.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  videographer: Videographer;
  videographerName: string;

  constructor(private route: ActivatedRoute, private videographerService: VideographerService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    let fullName = name.split('-');
    const firstName = fullName[0];
    const lastName = fullName[1];

    this.videographerService.getVideographer(firstName, lastName).subscribe(videogoo => this.videographer = videogoo);
  }

}
