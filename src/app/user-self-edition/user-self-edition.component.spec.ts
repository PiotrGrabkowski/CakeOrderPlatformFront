import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelfEditionComponent } from './user-self-edition.component';

describe('UserSelfEditionComponent', () => {
  let component: UserSelfEditionComponent;
  let fixture: ComponentFixture<UserSelfEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelfEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelfEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
