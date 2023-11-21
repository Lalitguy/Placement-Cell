import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationComponent } from './admin-notification.component';

describe('AdminNotificationComponent', () => {
  let component: AdminNotificationComponent;
  let fixture: ComponentFixture<AdminNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNotificationComponent]
    });
    fixture = TestBed.createComponent(AdminNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
