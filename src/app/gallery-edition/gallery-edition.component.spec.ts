import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryEditionComponent } from './gallery-edition.component';

describe('GalleryEditionComponent', () => {
  let component: GalleryEditionComponent;
  let fixture: ComponentFixture<GalleryEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
