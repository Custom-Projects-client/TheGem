import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// OurWork3 page  ->  route "/works/our-work-3"
// - Markup lives in our-work-3.html (edit text/images there)
@Component({
  selector: 'app-our-work-3',
  imports: PAGE_IMPORTS,
  templateUrl: './our-work-3.html',
})
export class OurWork3 {}
