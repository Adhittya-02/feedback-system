import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback';
import { FeedbackQuestion } from '../../models/feedback.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feedback-form',
  standalone : true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css',
})
export class FeedbackForm {
 companyId!: number;
  companyName = '';
  userName = '';
  userEmail = '';
  questions: FeedbackQuestion[] = [];
  responses: any = {};
  showPopup = false;
  constructor(private route: ActivatedRoute, private http: HttpClient,
      private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.companyId = +this.route.snapshot.paramMap.get('companyId')!;
    this.loadCompanyDetails();
  }

  loadCompanyDetails() {
    this.feedbackService.getById(this.companyId).subscribe({
      next: (data) => {
        this.companyName = data.companyName;
        this.questions = data.feedbackQuestions ?? []; // ✅ fallback to []
      },
      error: (err) => console.error('Error loading company:', err),
    });

  }
  submitFeedback() {
    const userIdentifier = {
      name: this.userName || 'Anonymous',
      email: this.userEmail || 'N/A'
    };

    // Convert { id: answer } → { questionText: answer }
    const responseData: Record<string, string> = {};
    this.questions.forEach(q => {
      const answer = this.responses[q.id];
      if (answer !== undefined && answer !== null) {
        responseData[q.question] = answer; // Use actual question text
      }
    });

    const feedbackDto = {
      feedbackId: this.companyId,
      responseData: JSON.stringify(responseData),
      userIdentifier: JSON.stringify(userIdentifier),
      createdDate: new Date()
    };

    this.http.post(`${environment.apiBaseUrl}/FeedbackResponse`, feedbackDto)
      .subscribe({
        next: () => {
        this.showPopup = true; // ✅ Show popup
        },
        error: (err) => {
          console.error('Error submitting feedback:', err);
          alert('❌ Failed to submit feedback. Please try again.');
        }
      });
  }

  closePopup() {
    this.showPopup = false;
    window.location.href = '/'; // redirect after closing popup
  }
}
