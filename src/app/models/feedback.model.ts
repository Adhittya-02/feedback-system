export interface FeedbackDto {
  id?: number;
  companyName: string;
  genre?: string;
  isHotel: boolean;
  isCompany: boolean;
  description?: string;
  createdDate?: Date;
  isActive: boolean;
  feedbackQuestions?: FeedbackQuestion[];
}

export interface FeedbackQuestion {
  id: number;
  feedbackId: number;
  question: string;
  questionType: string;
  isQuestion: boolean;
  orderNo?: number;
  createdDate: Date;
  feedback?: FeedbackDto; // use FeedbackDto to match naming convention
}