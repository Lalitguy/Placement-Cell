import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventComponent } from './admin-event.component';

describe('AdminEventComponent', () => {
  let component: AdminEventComponent;
  let fixture: ComponentFixture<AdminEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventComponent]
    });
    fixture = TestBed.createComponent(AdminEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
