import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback';
import { FeedbackDto } from '../../models/feedback.model';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
@Component({
  selector: 'app-feedback-list',
  standalone: true,   // ✅ Required for standalone component
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './feedback-list.html',
  styleUrl: './feedback-list.css',
})
export class FeedbackList {
  feedbacks: FeedbackDto[] = [];
  showAddForm = false;

  newFeedback: FeedbackDto = {
    id: 0,
    companyName: '',
    genre: '',
    description: '',
    isHotel: false,
    isCompany: true,
    isActive: true,
    createdDate: new Date()
  };

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  openCompanyFeedback(companyId: number | string | undefined): void {
    if (!companyId) return;
    this.router.navigate(['/feedback', companyId]);
  }

  // 🔹 Load all feedbacks from backend
  loadFeedbacks(): void {
    this.feedbackService.getAll().subscribe({
      next: (data: FeedbackDto[]) => {
        this.feedbacks = data;
      },
      error: (err: any) => {
        console.error('❌ Error retrieving feedbacks:', err);
      }
    });
  }

  // 🔹 Open add company form
  openAddCompanyForm(): void {
    this.showAddForm = true;
  }

  // 🔹 Cancel adding company
  cancelAdd(): void {
    this.resetForm();
    this.showAddForm = false;
  }

  // 🔹 Save company to backend
  addCompany(): void {
    if (!this.newFeedback.companyName.trim()) {
      alert('Please enter company name');
      return;
    }


    this.feedbackService.create(this.newFeedback).subscribe({
      next: (res) => {
        this.loadFeedbacks();
        this.resetForm();
        this.showAddForm = false;
      },
      error: (err) => {
        console.error('❌ Error saving feedback:', err);
      }
    });
  }

  private resetForm(): void {
    this.newFeedback = {
      id: 0,
      companyName: '',
      genre: '',
      description: '',
      isHotel: false,
      isCompany: true,
      isActive: true,
      createdDate: new Date()
    };
  }
  
showDeleteModal = false;
selectedFeedback: FeedbackDto | null = null;

openDeleteModal(feedback: FeedbackDto) {
  this.selectedFeedback = feedback;
  this.showDeleteModal = true;
}

cancelDelete() {
  this.selectedFeedback = null;
  this.showDeleteModal = false;
}

confirmDelete() {
  if (!this.selectedFeedback?.id) return;

  this.feedbackService.delete(this.selectedFeedback.id).subscribe({
    next: () => {
      this.feedbacks = this.feedbacks.filter(f => f.id !== this.selectedFeedback!.id);
      this.cancelDelete();
    },
    error: err => {
      console.error('❌ Delete failed', err);
      this.cancelDelete();
    }
  });
}

  goToFeedbackForm(companyId: number): void {
    this.router.navigate([`/feedback/${companyId}/form`]);
  }

  getFeedbackUrl(r: any): string {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/feedback/${r.id}/form`;
    }
    return `/feedback/${r.id}/form`;
  }
}
