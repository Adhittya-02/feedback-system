import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDashboard } from './feedback-dashboard';

describe('FeedbackDashboard', () => {
  let component: FeedbackDashboard;
  let fixture: ComponentFixture<FeedbackDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
