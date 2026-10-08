import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

// Circular skill chart. Attaches to: .diagram-circle
// - reads each .skill-arc (title, percent, color) from the markup
// - draws one ring per skill as SVG, animated when visible
@Directive({ selector: '.diagram-circle' })
export class DiagramCircle implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    const box = this.el.querySelector<HTMLElement>('.box');
    if (!box) return;

    // 1) read data from hidden markup
    const arcs = Array.from(this.el.querySelectorAll<HTMLElement>('.skill-arc')).map((a) => ({
      title: a.querySelector('.title')?.textContent?.trim() ?? '',
      percent: Number(a.querySelector<HTMLInputElement>('input.percent')?.value ?? 0),
      color: a.querySelector<HTMLInputElement>('input.color')?.value || '#00bbd3',
    }));

    // 2) build the SVG: rings (outer -> inner)
    const size = 500,
      center = 250,
      stroke = 26,
      gap = 14,
      outer = 230;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.style.cssText = 'width:100%;height:auto;display:block;';

    const progress: { circle: SVGCircleElement; len: number; pct: number }[] = [];
    arcs.forEach((arc, i) => {
      const r = outer - i * (stroke + gap);
      const len = 2 * Math.PI * r;
      const mk = (color: string) => {
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', `${center}`);
        c.setAttribute('cy', `${center}`);
        c.setAttribute('r', `${r}`);
        c.setAttribute('fill', 'none');
        c.setAttribute('stroke', color);
        c.setAttribute('stroke-width', `${stroke}`);
        return c;
      };
      svg.appendChild(mk('rgba(128,128,150,0.18)')); // track
      const bar = mk(arc.color);
      bar.setAttribute('stroke-dasharray', `${len}`);
      bar.setAttribute('stroke-dashoffset', `${len}`); // start empty
      bar.setAttribute('transform', `rotate(-90 ${center} ${center})`);
      bar.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
      svg.appendChild(bar);
      progress.push({ circle: bar, len, pct: arc.percent });
    });

    // 3) centre title
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', `${center}`);
    label.setAttribute('y', `${center + 8}`);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', 'currentColor');
    label.setAttribute('font-size', '26');
    label.setAttribute('font-weight', '700');
    label.textContent = this.el.dataset['title'] ?? '';
    svg.appendChild(label);
    box.appendChild(svg);

    // 4) legend under the chart
    const legend = document.createElement('div');
    legend.style.cssText =
      'display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:center;margin-top:16px;';
    arcs.forEach((a) => {
      const item = document.createElement('span');
      item.style.cssText = 'display:inline-flex;align-items:center;gap:8px;font-size:14px;';
      const dot = document.createElement('i');
      dot.style.cssText = `width:12px;height:12px;border-radius:50%;background:${a.color};display:inline-block;`;
      item.append(dot, `${a.title} ${a.percent}%`);
      legend.appendChild(item);
    });
    box.appendChild(legend);

    // 5) animate when scrolled into view
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        progress.forEach((p) =>
          p.circle.setAttribute('stroke-dashoffset', `${p.len * (1 - p.pct / 100)}`),
        );
        this.observer?.disconnect();
      },
      { threshold: 0.3 },
    );
    this.observer.observe(box);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
