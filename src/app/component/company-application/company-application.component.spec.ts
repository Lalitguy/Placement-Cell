import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApplicationComponent } from './company-application.component';

describe('CompanyApplicationComponent', () => {
  let component: CompanyApplicationComponent;
  let fixture: ComponentFixture<CompanyApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyApplicationComponent]
    });
    fixture = TestBed.createComponent(CompanyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
