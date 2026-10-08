import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Testimonial slider. Attaches to: .gem-testimonials
// - shows one .gem-testimonial-item at a time
// - fades to the next every 6 seconds
@Directive({ selector: '.gem-testimonials' })
export class Testimonials implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private timer?: ReturnType<typeof setInterval>;

  ngAfterViewInit() {
    const items = Array.from(
      this.el.querySelectorAll<HTMLElement>(':scope > .gem-testimonial-item'),
    );
    if (items.length < 2) return;

    items.forEach((item, i) => {
      item.style.transition = 'opacity 0.6s';
      item.style.display = i === 0 ? '' : 'none';
    });

    let current = 0;
    this.timer = setInterval(() => {
      const from = items[current];
      current = (current + 1) % items.length;
      const to = items[current];
      from.style.opacity = '0'; // fade out
      setTimeout(() => {
        from.style.display = 'none';
        to.style.opacity = '0';
        to.style.display = '';
        requestAnimationFrame(() => (to.style.opacity = '1')); // fade in
      }, 600);
    }, 6000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
