import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackBuilder } from './feedback-builder';

describe('FeedbackBuilder', () => {
  let component: FeedbackBuilder;
  let fixture: ComponentFixture<FeedbackBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
