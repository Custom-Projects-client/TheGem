import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// UnbelievableItems page  ->  route "/works/unbelievable-items"
// - Markup lives in unbelievable-items.html (edit text/images there)
@Component({
  selector: 'app-unbelievable-items',
  imports: PAGE_IMPORTS,
  templateUrl: './unbelievable-items.html',
})
export class UnbelievableItems {}
