import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// OurWork2 page  ->  route "/works/our-work-2"
// - Markup lives in our-work-2.html (edit text/images there)
@Component({
  selector: 'app-our-work-2',
  imports: PAGE_IMPORTS,
  templateUrl: './our-work-2.html',
})
export class OurWork2 {}
