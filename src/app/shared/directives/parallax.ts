import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Parallax background: image moves slower than the page when scrolling.
// Attaches to: .fullwidth-block-background inside .fullwidth-block-parallax-vertical
// - background box is made 30% taller, then shifted on scroll
const SPEED = 0.3; // 0 = no effect, higher = stronger

@Directive({ selector: '.fullwidth-block-background' })
export class Parallax implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private parent: HTMLElement | null = null;
  private frame = 0;
  private onScroll = () => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.update());
  };

  ngAfterViewInit() {
    this.parent = this.el.closest<HTMLElement>('.fullwidth-block-parallax-vertical');
    if (!this.parent) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // touch devices: keep static

    this.update();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
  }

  private update() {
    if (!this.parent) return;
    const box = this.parent.getBoundingClientRect();
    const extra = box.height * SPEED;
    const s = this.el.style;
    s.bottom = 'auto'; // we control the height ourselves
    s.height = `${box.height + extra}px`;
    // box.top <= 0 means the section started scrolling past the top
    const y = Math.max(-extra, Math.min(0, SPEED * box.top));
    s.transform = `translate3d(0, ${y}px, 0)`;
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}
