import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Contact form used on several pages: <app-contact-form />
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private fb = inject(FormBuilder);

  // Fields + rules. Add a field here AND in the html.
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    website: ['', Validators.required],
    message: ['', Validators.required],
  });

  status = signal<'idle' | 'error' | 'sent'>('idle');

  // Red tip shows only after the field was touched / submit tried
  invalid(field: 'name' | 'email' | 'website' | 'message') {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.status() === 'error');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('error');
      return;
    }
    // TODO: send this.form.getRawValue() to your backend / email service
    console.log('Contact form:', this.form.getRawValue());
    this.status.set('sent');
    this.form.reset();
  }
}
