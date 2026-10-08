import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { ScrollTop } from './layout/scroll-top/scroll-top';

// Root component = page frame: header + routed page + footer.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ScrollTop],
  templateUrl: './app.html',
})
export class App {
  private router = inject(Router);

  constructor() {
    // After each navigation, set <body> classes from the route's data.bodyClass
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let route = this.router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      document.body.className = route.data['bodyClass'] ?? '';
    });
  }
}
