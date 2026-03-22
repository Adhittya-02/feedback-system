import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback';
import { FeedbackDto } from '../../models/feedback.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feedback-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-dashboard.html',
  styleUrl: './feedback-dashboard.css',
})
export class FeedbackDashboard {
  company?: FeedbackDto;
  feedbackResponses: any[] = []; // later link to API responses
  companyId!: number;
  showSuccessPopup = false; // add this at the top of your component class
  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('companyId'));
    this.loadCompanyDetails();
    this.loadResponses(this.companyId);
  }

  questions: any[] = [];
  showCustomizePopup = false;
  loadCompanyDetails() {
    this.feedbackService.getById(this.companyId).subscribe({
      next: (data) => (this.company = data),
      error: (err) => console.error('Error loading company:', err),
    });
  }

  loadResponses(feedbackId: number): void {
    this.http
      .get<any[]>(`${environment.apiBaseUrl}/FeedbackResponse/${feedbackId}/responses`)
      .subscribe({
        next: (res) => {
          this.feedbackResponses = res.map((r) => ({
            id: r.id,
            createdDate: r.createdDate,
            user: r.user || {},
            answers: r.answers || {},
          }));
        },
        error: (err) => console.error('Error loading responses:', err),
      });
  }


  getAnswerKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }


  customizeQuestions() {
    alert('Customize feedback questions clicked! (Coming soon)');
  }


  openCustomizePopup(): void {
    this.showCustomizePopup = true;
    this.loadQuestions();
  }

  closeCustomizePopup(): void {
    this.showCustomizePopup = false;
  }

  loadQuestions(): void {
    //debugger
    this.feedbackService.getQuestions(this.companyId).subscribe({
      next: (data: any) => this.questions = data as any[],
      error: (err) => console.error('Error loading questions', err)
    });
  }

  addNewQuestion(): void {
    this.questions.push({
      feedbackId: this.companyId,
      question: '',
      questionType: 'text',
      isQuestion: true,
      orderNo: this.questions.length + 1
    });
  }

  saveQuestion(q: any): void {
    // debugger
    if (q.id) {
      this.feedbackService.updateQuestion(q.id, q).subscribe({
        next: () => {
          this.showTemporarySuccess();
          this.loadQuestions();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.feedbackService.addQuestion(q).subscribe({
        next: (res: any) => {
          if (res && res.id) {
            q.id = res.id;
          }
          this.showTemporarySuccess();
          this.loadQuestions();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // helper method
  showTemporarySuccess(): void {
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 2000); // hide after 2 seconds
  }


}
