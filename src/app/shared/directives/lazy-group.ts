import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// SCROLL-REVEAL ENGINE (port of the theme's "lazy-loading" animations)
// How it works:
// - a .lazy-loading box = a group; its .lazy-loading-item children animate in
// - item effect comes from data-ll-effect (fading, move-up, clip, drop-bottom, ...)
// - CSS in theme.css does the animation; we only switch the classes:
//     before-start  ->  start  ->  end
// - groups play one after another (queue), like the original

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class Group {
  shown = false;
  constructor(
    public el: HTMLElement,
    public offset: number, // 0.7 = reveal when ~30% is visible
    public finishDelay: number, // ms before next group may start
  ) {}
}

// Shared by every group on the page
const groups = new Set<Group>();
const queue: Group[] = [];
let running = false;
let scheduled = false;
let listening = false;

function isVisible(g: Group): boolean {
  const r = g.el.getBoundingClientRect();
  const vh = window.innerHeight;
  const normal = r.top + g.offset * r.height <= vh && r.top + (1 - g.offset) * r.height >= 0;
  const tallBox = r.height > vh * 1.5 && r.top < vh * 0.5 && r.bottom > 0; // very tall group
  return normal || tallBox;
}

function check() {
  scheduled = false;
  groups.forEach((g) => {
    if (!g.shown && isVisible(g)) {
      g.shown = true;
      queue.push(g);
    }
  });
  next();
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(check);
}

function next() {
  if (running || queue.length === 0) return;
  running = true;
  const g = queue.shift()!;
  start(g);
  setTimeout(() => {
    running = false;
    next();
  }, g.finishDelay);
}

function start(g: Group) {
  g.el.classList.remove('lazy-loading-before-start-animation');
  g.el.classList.add('lazy-loading-start-animation');
  // after the animation: switch to "end" state
  setTimeout(() => {
    g.el.classList.remove('lazy-loading-start-animation');
    g.el.classList.add('lazy-loading-end-animation');
  }, g.finishDelay + 1200);
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  // page height changes (images load) -> re-check
  new ResizeObserver(schedule).observe(document.body);
}

@Directive({ selector: '.lazy-loading' })
export class LazyGroup implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private group?: Group;

  ngAfterViewInit() {
    const el = this.el;

    // List items slide in one by one (same as original)
    if (el.classList.contains('gem-list')) {
      el.querySelectorAll<HTMLElement>('li').forEach((li, i) => {
        li.classList.add('lazy-loading-item');
        li.dataset['llEffect'] = 'slide-right';
        li.style.transitionDelay = `${(i + 1) * 0.2}s`;
      });
    }

    // Give each item its effect class, e.g. data-ll-effect="fading" -> lazy-loading-item-fading
    el.querySelectorAll<HTMLElement>('.lazy-loading-item').forEach((item) => {
      let effect = item.dataset['llEffect'] ?? '';
      if (effect === 'drop-right-without-wrap' || effect === 'drop-right-unwrap')
        effect = 'drop-right';
      if (effect) item.classList.add(`lazy-loading-item-${effect}`);
    });

    const offset = parseFloat(el.dataset['llOffset'] ?? '0.7');
    const finishDelay = Number(el.dataset['llFinishDelay'] ?? 200);
    this.group = new Group(el, offset, finishDelay);

    // Users who prefer no motion: show at once, no animation
    if (reduceMotion()) {
      el.classList.add('lazy-loading-end-animation');
      return;
    }
    el.classList.add('lazy-loading-before-start-animation'); // hidden/offset state
    groups.add(this.group);
    listen();
    schedule();
    setTimeout(schedule, 300); // re-check after first layout
  }

  ngOnDestroy() {
    if (!this.group) return;
    groups.delete(this.group);
    const i = queue.indexOf(this.group);
    if (i >= 0) queue.splice(i, 1);
  }
}
