import { Directive, ElementRef, HostListener, inject } from '@angular/core';

// Hover colour swap for buttons/links.
// Attaches to: any element with data-hover-in="color:#fff;background-color:#00bcd4"
// - data-hover-in  = styles applied on mouse over
// - data-hover-out = styles applied on mouse leave (optional; else original values return)
@Directive({ selector: '[data-hover-in]' })
export class HoverStyle {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private saved: [string, string][] = [];

  private parse(text?: string): [string, string][] {
    return (text ?? '')
      .split(';')
      .map((p) => p.split(':'))
      .filter((p) => p.length === 2)
      .map(([k, v]) => [k.trim(), v.trim()] as [string, string]);
  }

  @HostListener('mouseenter')
  enter() {
    const style = this.el.style;
    const rules = this.parse(this.el.dataset['hoverIn']);
    this.saved = rules.map(([k]) => [k, style.getPropertyValue(k)]); // remember originals
    rules.forEach(([k, v]) => style.setProperty(k, v));
  }

  @HostListener('mouseleave')
  leave() {
    const style = this.el.style;
    const out = this.parse(this.el.dataset['hoverOut']);
    if (out.length) out.forEach(([k, v]) => style.setProperty(k, v));
    else this.saved.forEach(([k, v]) => (v ? style.setProperty(k, v) : style.removeProperty(k)));
  }
}
