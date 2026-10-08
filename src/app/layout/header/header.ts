import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { MENU, MenuItem, SOCIALS } from '../../core/site-data';

const MOBILE_MAX = 979; // px, same breakpoint as the original theme
const STICK_AT = 40; // px scrolled before header sticks to top

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router);

  menu = MENU;
  socials = SOCIALS;

  open = signal(false); // menu open?
  mobile = signal(window.innerWidth <= MOBILE_MAX); // small screen?
  stuck = signal(window.scrollY > STICK_AT); // page scrolled?
  openItem = signal(''); // expanded sub-menu (mobile only)
  url = signal(this.router.url); // current URL, for active highlight

  constructor() {
    // New page: remember URL, close menu
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.url.set(e.urlAfterRedirects);
      this.close();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile.set(window.innerWidth <= MOBILE_MAX);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.stuck.set(window.scrollY > STICK_AT);
  }

  @HostListener('document:keydown.escape')
  close() {
    this.open.set(false);
    this.openItem.set('');
  }

  toggle() {
    this.open.update((v) => !v);
  }

  // Mobile: tapping a parent opens its sub-menu instead of navigating
  onParentClick(item: MenuItem) {
    if (this.mobile() && item.children) {
      this.openItem.update((cur) => (cur === item.label ? '' : item.label));
    }
  }

  // Highlight helpers
  isExact(link: string) {
    return this.url().split(/[?#]/)[0] === link;
  }
  isActive(item: MenuItem) {
    const path = this.url().split(/[?#]/)[0];
    return path === item.link || path.startsWith(item.link + '/');
  }
}
