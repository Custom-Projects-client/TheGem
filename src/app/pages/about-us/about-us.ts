import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// AboutUs page  ->  route "/about-us"
// - Markup lives in about-us.html (edit text/images there)
@Component({
  selector: 'app-about-us',
  imports: PAGE_IMPORTS,
  templateUrl: './about-us.html',
})
export class AboutUs {}
