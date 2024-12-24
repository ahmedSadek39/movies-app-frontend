import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOmComponent } from './admin-om.component';

describe('AdminOmComponent', () => {
  let component: AdminOmComponent;
  let fixture: ComponentFixture<AdminOmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
