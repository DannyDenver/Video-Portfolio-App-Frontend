import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideographerCarouselComponent } from './videographer-carousel.component';

describe('CarouselComponent', () => {
  let component: VideographerCarouselComponent;
  let fixture: ComponentFixture<VideographerCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideographerCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideographerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
