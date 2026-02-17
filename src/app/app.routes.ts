import { Routes } from '@angular/router';
import { FeedbackList } from '../app/components/feedback-list/feedback-list';
import { FeedbackForm } from '../app/components/feedback-form/feedback-form';
import { FeedbackBuilder } from '../app/components/feedback-builder/feedback-builder';
import { FeedbackDashboard } from '../app/components/feedback-dashboard/feedback-dashboard';


export const routes: Routes = [
  { path: '', component: FeedbackList },
  { path: 'feedback/:companyId/form', component: FeedbackForm , data: { renderMode: 'client' } }, // User feedback form
  { path: 'feedback/:companyId', component: FeedbackDashboard },
  { path: 'builder', component: FeedbackBuilder },
  { path: '**', redirectTo: '' }
];
