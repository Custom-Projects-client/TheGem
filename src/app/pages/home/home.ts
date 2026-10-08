import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// Home page  ->  route "/"
// - Markup lives in home.html (edit text/images there)
@Component({
  selector: 'app-home',
  imports: PAGE_IMPORTS,
  templateUrl: './home.html',
})
export class Home {}
