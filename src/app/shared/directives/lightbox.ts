import { Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';

// Image lightbox for gallery links.
// Attaches to: <a data-fancybox="group" href="big.jpg">  and  <a class="icon photo">
// - click opens the big image; arrows / Esc work; click outside closes
@Directive({ selector: 'a[data-fancybox], a.icon.photo' })
export class Lightbox implements OnDestroy {
  private el = inject<ElementRef<HTMLAnchorElement>>(ElementRef).nativeElement;
  private overlay?: HTMLElement;
  private images: string[] = [];
  private index = 0;
  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  };

  @HostListener('click', ['$event'])
  open(event: Event) {
    event.preventDefault();
    // find all images in the same gallery group
    const groupLink =
      this.el.closest('li')?.querySelector<HTMLAnchorElement>('a[data-fancybox]') ?? this.el;
    const group = groupLink.getAttribute('data-fancybox');
    const links = group
      ? Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[data-fancybox="${group}"]`))
      : [this.el];
    this.images = links.map((l) => l.getAttribute('href') ?? '');
    this.index = Math.max(0, this.images.indexOf(this.el.getAttribute('href') ?? ''));
    this.render();
  }

  private render() {
    this.close();
    const o = document.createElement('div');
    o.className = 'lightbox';
    const img = document.createElement('img');
    img.src = this.images[this.index];
    const btn = (cls: string, text: string, fn: () => void) => {
      const b = document.createElement('button');
      b.className = cls;
      b.textContent = text;
      b.onclick = (e) => {
        e.stopPropagation();
        fn();
      };
      return b;
    };
    o.append(
      img,
      btn('lb-close', '\u00d7', () => this.close()),
    );
    if (this.images.length > 1) {
      o.append(
        btn('lb-prev', '\u2039', () => this.step(-1)),
        btn('lb-next', '\u203a', () => this.step(1)),
      );
    }
    o.onclick = () => this.close(); // click backdrop
    img.onclick = (e) => e.stopPropagation();
    document.body.appendChild(o);
    document.addEventListener('keydown', this.onKey);
    this.overlay = o;
  }

  private step(dir: number) {
    this.index = (this.index + dir + this.images.length) % this.images.length;
    this.render();
  }

  private close() {
    this.overlay?.remove();
    this.overlay = undefined;
    document.removeEventListener('keydown', this.onKey);
  }

  ngOnDestroy() {
    this.close();
  }
}
