import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideographerListComponent } from './videographer-list.component';

describe('VideographerListComponent', () => {
  let component: VideographerListComponent;
  let fixture: ComponentFixture<VideographerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideographerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideographerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
