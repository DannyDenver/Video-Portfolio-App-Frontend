import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Videographer } from 'src/app/shared/models/videographer';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'videographer-carousel',
  templateUrl: './videographer-carousel.component.html',
  styleUrls: ['./videographer-carousel.component.scss']
})

export class VideographerCarouselComponent {
@Input() videographers: Videographer[];
@ViewChild('owlElement', {static: true}) owlElement: OwlCarousel
mySlideOptions={items: 3, dots: true, nav: false, margin: 5};

  constructor() { }
  getLink(vg: Videographer) {
    return vg.id;
  }
}
