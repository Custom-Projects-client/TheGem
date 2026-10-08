import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Animated progress bar. Attaches to: .skill-element
// - bar width = data-amount (percent) on the inner div
// - fills + counts up when scrolled into view
@Directive({ selector: '.skill-element' })
export class SkillBar implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;
  private frame = 0;

  ngAfterViewInit() {
    const bar = this.el.querySelector<HTMLElement>('.skill-line > div[data-amount]');
    const label = this.el.querySelector<HTMLElement>('.skill-amount');
    if (!bar) return;
    const amount = Number(bar.dataset['amount'] ?? 0);
    bar.style.transition = 'width 1.6s cubic-bezier(0.165, 0.84, 0.44, 1)';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        bar.style.width = `${amount}%`;
        this.countUp(label, amount);
        this.observer?.disconnect(); // run once
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.el);
  }

  private countUp(label: HTMLElement | null, amount: number) {
    if (!label) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1600, 1);
      label.textContent = `${Math.round(amount * t)}%`;
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
