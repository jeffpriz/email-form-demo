import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  form: FormGroup;
  submitted = false;
  submitSuccess = false;
  submitError = false;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      question: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    this.submitError = false;

    // Build mailto link as a fallback for form submission
    const { firstName, lastName, email, question } = this.form.value;
    const subject = encodeURIComponent(`Feedback from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n\nQuestion/Comment:\n${question}`
    );

    // Open mailto – in an iframe context the parent page handles navigation;
    // as a graceful fallback we attempt window.location for compatibility.
    try {
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      this.submitSuccess = true;
      this.loading = false;
      this.form.reset();
      this.submitted = false;
    } catch {
      this.submitError = true;
      this.loading = false;
    }
  }
}
