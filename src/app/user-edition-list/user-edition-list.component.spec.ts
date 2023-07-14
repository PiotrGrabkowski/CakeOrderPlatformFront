import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditionListComponent } from './user-edition-list.component';

describe('UserEditionListComponent', () => {
  let component: UserEditionListComponent;
  let fixture: ComponentFixture<UserEditionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
