import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Grid items fly in (move-up) when scrolled into view.
// Attaches to: .portfolio-item, .gallery-item, article.post
// - only if the item sits inside a box with class "item-animation-*"
// - CSS does the animation; we toggle: before-start -> start-animation
let pending = 0; // items waiting in this batch (gives the 1-by-1 stagger)

@Directive({ selector: '.portfolio-item, .gallery-item, article.post' })
export class ItemAnimation implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private active = false;

  constructor() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.active = !reduce && !!this.el.closest('[class*="item-animation-"]');
    // start hidden (set before first paint, so no flash)
    if (this.active) this.el.classList.add('item-animations-inited', 'before-start');
  }

  ngAfterViewInit() {
    if (!this.active) return;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.observer?.disconnect();
        const delay = pending++ * 150; // 150ms between items
        this.timers.push(
          setTimeout(() => {
            this.el.classList.add('start-animation');
            pending = Math.max(0, pending - 1);
            // animation done -> clean up classes
            this.timers.push(
              setTimeout(() => this.el.classList.remove('before-start', 'start-animation'), 1200),
            );
          }, delay),
        );
      },
      { threshold: 0.1 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.timers.forEach(clearTimeout);
  }
}
