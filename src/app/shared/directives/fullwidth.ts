import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Stretches a section to the full browser width.
// Attaches to: .fullwidth-block  and  .vc_row[data-vc-full-width]
// - replaces the original WordPress/WPBakery JS
// - keeps inner content aligned with the page container
@Directive({ selector: '.fullwidth-block, .vc_row[data-vc-full-width]' })
export class Fullwidth implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: ResizeObserver;
  private frame = 0;
  private original = { ml: '', w: '', pl: '', pr: '', box: '' };

  ngAfterViewInit() {
    const s = this.el.style;
    this.original = {
      ml: s.marginLeft,
      w: s.width,
      pl: s.paddingLeft,
      pr: s.paddingRight,
      box: s.boxSizing,
    };
    this.stretch();
    // re-run when the window / page size changes
    this.observer = new ResizeObserver(() => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => this.stretch());
    });
    this.observer.observe(document.documentElement);
  }

  private stretch() {
    const el = this.el;
    const s = el.style;
    // 1) back to natural layout, so we can measure
    s.marginLeft = this.original.ml;
    s.width = this.original.w;
    s.paddingLeft = this.original.pl;
    s.paddingRight = this.original.pr;
    s.boxSizing = this.original.box;

    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const vw = document.documentElement.getBoundingClientRect().width; // page width without scrollbar
    const gapLeft = rect.left;
    const gapRight = vw - rect.right;
    const keepEdge = el.dataset['vcStretchContent'] === 'true'; // content touches screen edges

    // 2) grow to viewport width; padding keeps content where it was
    s.boxSizing = 'border-box';
    s.width = `${vw}px`;
    s.marginLeft = `${(parseFloat(cs.marginLeft) || 0) - gapLeft}px`;
    s.paddingLeft = keepEdge ? '0px' : `${(parseFloat(cs.paddingLeft) || 0) + gapLeft}px`;
    s.paddingRight = keepEdge ? '0px' : `${(parseFloat(cs.paddingRight) || 0) + gapRight}px`;
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
