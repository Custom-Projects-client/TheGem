import { Component, HostListener, signal } from '@angular/core';

// Round "back to top" button (bottom-right). Shows after you scroll.
@Component({
  selector: 'app-scroll-top',
  template: `<a
    class="scroll-top-button"
    href="#page"
    [class.visible]="visible()"
    (click)="up($event)"
  ></a>`,
})
export class ScrollTop {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > 0);
  }

  up(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
