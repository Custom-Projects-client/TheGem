import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Fullwidth } from '../../shared/directives/fullwidth';
import { LazyGroup } from '../../shared/directives/lazy-group';

// Footer markup is in footer.html (3 blocks: info strip, widgets, copyright bar).
@Component({
  selector: 'app-footer',
  imports: [RouterLink, ReactiveFormsModule, Fullwidth, LazyGroup],
  templateUrl: './footer.html',
})
export class Footer {
  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  subscribed = signal(false);

  subscribe(event: Event) {
    event.preventDefault();
    if (this.email.invalid) return;
    // TODO: send this.email.value to your newsletter service here
    this.subscribed.set(true);
    this.email.reset();
  }
}
