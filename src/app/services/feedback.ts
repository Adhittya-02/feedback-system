import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackDto } from '../models/feedback.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiBaseUrl}/feedbacks`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<FeedbackDto[]> {
    return this.http.get<FeedbackDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<FeedbackDto> {
    return this.http.get<FeedbackDto>(`${this.apiUrl}/${id}`);
  }

  create(feedback: FeedbackDto): Observable<FeedbackDto> {
    return this.http.post<FeedbackDto>(this.apiUrl, feedback);
  }

  getQuestions(feedbackId: number) {
    return this.http.get(`${this.apiUrl.replace('feedbacks', 'feedbackquestions')}/${feedbackId}`);
  }

  addQuestion(question: any) {
    return this.http.post(this.apiUrl.replace('feedbacks', 'feedbackquestions'), question);
  }

  updateQuestion(id: number, question: any) {
    return this.http.put(`${this.apiUrl.replace('feedbacks', 'feedbackquestions')}/${id}`, question);
  }

  // update(id: number, feedback: FeedbackDto): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}`, feedback);
  // }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
