import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// FastLogoItems page  ->  route "/works/fast-logo-items"
// - Markup lives in fast-logo-items.html (edit text/images there)
@Component({
  selector: 'app-fast-logo-items',
  imports: PAGE_IMPORTS,
  templateUrl: './fast-logo-items.html',
})
export class FastLogoItems {}
