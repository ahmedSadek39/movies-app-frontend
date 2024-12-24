import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDbComponent } from './user-db.component';

describe('UserDbComponent', () => {
  let component: UserDbComponent;
  let fixture: ComponentFixture<UserDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
