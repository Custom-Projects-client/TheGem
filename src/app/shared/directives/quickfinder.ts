import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// HOVER EFFECT for the service boxes ("quickfinder"): icon, box, border and text change colour.
// Attaches to: .quickfinder
// - target colours come from data attributes on that box:
//     data-hover-icon-color, data-hover-box-color, data-hover-border-color,
//     data-hover-title-color, data-hover-description-color
// - on mouse over: apply them (+ class "hover" for the CSS fill animation)
// - on mouse leave: put the original colours back

interface Saved {
  icon1: string;
  icon2: string;
  iconBg: string;
  iconBorder: string;
  boxBg: string;
  boxBorder: string;
  title: string;
  text: string;
  btnColor: string;
  btnBg: string;
  btnBorder: string;
}

@Directive({ selector: '.quickfinder' })
export class Quickfinder implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private cleanups: (() => void)[] = [];

  ngAfterViewInit() {
    this.el.querySelectorAll<HTMLElement>('.quickfinder-item').forEach((item) => {
      const links = item.querySelectorAll('a');
      if (!links.length) return; // only boxes with a link animate

      const saved = this.capture(item); // 1) remember normal colours

      // 2) extra element the CSS uses for the "fill" animation
      const c = item.classList;
      const needsFill =
        c.contains('quickfinder-item-effect-background-reverse') ||
        (c.contains('quickfinder-item-effect-border-reverse') &&
          !c.contains('border-reverse-with-background'));
      const inner = item.querySelector('.gem-icon-inner');
      if (needsFill && inner && !inner.querySelector('.quickfinder-animation')) {
        const fill = document.createElement('div');
        fill.className = 'quickfinder-animation';
        inner.prepend(fill);
      }

      // 3) hover in / out
      links.forEach((a) => {
        const enter = () => this.enter(item, saved);
        const leave = () => this.leave(item, saved);
        a.addEventListener('mouseenter', enter);
        a.addEventListener('mouseleave', leave);
        this.cleanups.push(() => {
          a.removeEventListener('mouseenter', enter);
          a.removeEventListener('mouseleave', leave);
        });
      });
    });
  }

  // ---- helpers
  private q(item: HTMLElement, sel: string) {
    return item.querySelector<HTMLElement>(sel);
  }
  private get(e: HTMLElement | null, prop: string) {
    return e ? getComputedStyle(e).getPropertyValue(prop) : '';
  }
  private set(e: HTMLElement | null, prop: string, value?: string) {
    if (e && value) e.style.setProperty(prop, value);
  }

  private capture(item: HTMLElement): Saved {
    const q = (s: string) => this.q(item, s);
    const s: Saved = {
      icon1: this.get(q('.gem-icon-half-1'), 'color'),
      icon2: this.get(q('.gem-icon-half-2'), 'color'),
      iconBg: this.get(q('.gem-icon-inner'), 'background-color'),
      iconBorder: this.get(q('.gem-icon'), 'border-left-color'),
      boxBg: this.get(q('.quickfinder-item-box'), 'background-color'),
      boxBorder: this.get(q('.quickfinder-item-box'), 'border-left-color'),
      title: this.get(q('.quickfinder-item-title'), 'color'),
      text: this.get(q('.quickfinder-item-text'), 'color'),
      btnColor: this.get(q('.quickfinder-button .gem-button'), 'color'),
      btnBg: this.get(q('.quickfinder-button .gem-button'), 'background-color'),
      btnBorder: this.get(q('.quickfinder-button .gem-button'), 'border-left-color'),
    };
    if (q('.gem-icon')?.classList.contains('gem-icon-shape-hexagon')) {
      s.iconBg = this.get(q('.gem-icon-shape-hexagon-top-inner-before'), 'background-color');
      s.iconBorder = this.get(q('.gem-icon-shape-hexagon-back-inner-before'), 'background-color');
    }
    return s;
  }

  // ---- mouse over
  private enter(item: HTMLElement, saved: Saved) {
    const d = this.el.dataset;
    const q = (s: string) => this.q(item, s);
    const set = (s: string, prop: string, v?: string) => this.set(q(s), prop, v);
    const has = (cls: string) => item.classList.contains(cls);
    const hex = !!q('.gem-icon')?.classList.contains('gem-icon-shape-hexagon');
    const style =
      this.el.classList.contains('quickfinder-style-default') ||
      this.el.classList.contains('quickfinder-style-vertical');
    const hic = d['hoverIconColor'];

    item.classList.add('hover');

    if (hic) {
      if (has('quickfinder-item-effect-background-reverse')) {
        if (hex) {
          set('.gem-icon-shape-hexagon-back-inner-before', 'background-color', hic);
          set('.gem-icon-shape-hexagon-top-inner-before', 'background-color', '#ffffff');
        } else {
          set('.gem-icon', 'border-color', hic);
          set('.gem-icon-inner', 'background-color', hic);
        }
        set('.gem-icon-half-1', 'color', hic);
        set('.gem-icon-half-2', 'color', hic);
      }
      if (has('quickfinder-item-effect-border-reverse')) {
        if (hex) {
          set('.gem-icon-shape-hexagon-back-inner-before', 'background-color', hic);
          set('.gem-icon-shape-hexagon-top-inner-before', 'background-color', hic);
        } else {
          set('.gem-icon', 'border-color', hic);
          set('.gem-icon-inner', 'background-color', hic);
        }
        set('.gem-icon-half-1', 'color', '#ffffff');
        set('.gem-icon-half-2', 'color', '#ffffff');
      }
      if (has('quickfinder-item-effect-simple')) {
        set('.gem-icon-half-1', 'color', hic);
        set('.gem-icon-half-2', 'color', hic);
      }
    } else {
      // no icon colour given: just invert the icon
      const white = (c: string) => c === '#ffffff' || c === 'rgb(255, 255, 255)';
      if (has('quickfinder-item-effect-background-reverse')) {
        if (hex) set('.gem-icon-shape-hexagon-top-inner-before', 'background-color', '#ffffff');
        if (white(saved.icon1)) set('.gem-icon-half-1', 'color', saved.iconBorder);
        if (white(saved.icon2)) set('.gem-icon-half-2', 'color', saved.iconBorder);
      }
      if (has('quickfinder-item-effect-border-reverse')) {
        if (hex)
          set('.gem-icon-shape-hexagon-top-inner-before', 'background-color', saved.iconBorder);
        else set('.gem-icon-inner', 'background-color', saved.iconBorder);
        set('.gem-icon-half-1', 'color', '#ffffff');
        set('.gem-icon-half-2', 'color', '#ffffff');
      }
    }

    if (!style) {
      set('.quickfinder-item-box', 'background-color', d['hoverBoxColor']);
      set('.quickfinder-item-box', 'border-color', d['hoverBorderColor']);
    }
    set('.quickfinder-item-title', 'color', d['hoverTitleColor']);
    set('.quickfinder-item-text', 'color', d['hoverDescriptionColor']);
    set('.quickfinder-button .gem-button', 'color', d['hoverButtonTextColor']);
    set('.quickfinder-button .gem-button', 'background-color', d['hoverButtonBackgroundColor']);
    set('.quickfinder-button .gem-button', 'border-color', d['hoverButtonBorderColor']);
  }

  // ---- mouse leave: restore
  private leave(item: HTMLElement, s: Saved) {
    const q = (sel: string) => this.q(item, sel);
    item.classList.remove('hover');
    this.set(q('.gem-icon'), 'border-color', s.iconBorder);
    this.set(q('.gem-icon-inner'), 'background-color', s.iconBg);
    this.set(q('.gem-icon-half-1'), 'color', s.icon1);
    this.set(q('.gem-icon-half-2'), 'color', s.icon2);
    this.set(q('.quickfinder-item-box'), 'background-color', s.boxBg);
    this.set(q('.quickfinder-item-box'), 'border-color', s.boxBorder);
    this.set(q('.quickfinder-item-title'), 'color', s.title);
    this.set(q('.quickfinder-item-text'), 'color', s.text);
    this.set(q('.quickfinder-button .gem-button'), 'color', s.btnColor);
    this.set(q('.quickfinder-button .gem-button'), 'background-color', s.btnBg);
    this.set(q('.quickfinder-button .gem-button'), 'border-color', s.btnBorder);
    if (q('.gem-icon')?.classList.contains('gem-icon-shape-hexagon')) {
      this.set(q('.gem-icon-shape-hexagon-top-inner-before'), 'background-color', s.iconBg);
      this.set(q('.gem-icon-shape-hexagon-back-inner-before'), 'background-color', s.iconBorder);
    }
  }

  ngOnDestroy() {
    this.cleanups.forEach((fn) => fn());
  }
}
