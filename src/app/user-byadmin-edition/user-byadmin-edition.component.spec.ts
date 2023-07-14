import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserByadminEditionComponent } from './user-byadmin-edition.component';

describe('UserByadminEditionComponent', () => {
  let component: UserByadminEditionComponent;
  let fixture: ComponentFixture<UserByadminEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserByadminEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserByadminEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
