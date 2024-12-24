import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDbComponent } from './admin-db.component';

describe('AdminDbComponent', () => {
  let component: AdminDbComponent;
  let fixture: ComponentFixture<AdminDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
