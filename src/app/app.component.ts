import { Component } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedbackFormComponent],
  template: `<app-feedback-form></app-feedback-form>`,
  styles: [],
})
export class AppComponent {}
