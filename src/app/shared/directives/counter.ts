import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Count-up number. Attaches to: <div class="gem-counter-odometer" data-to="2189">
// - counts 0 -> data-to when scrolled into view
@Directive({ selector: '.gem-counter-odometer' })
export class Counter implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;
  private frame = 0;

  ngAfterViewInit() {
    const target = Number(this.el.dataset['to'] ?? 0);
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.run(target);
          this.observer?.disconnect(); // run once
        }
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.el);
  }

  private run(target: number) {
    const duration = 1800; // ms
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      this.el.textContent = Math.round(target * eased).toString();
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
