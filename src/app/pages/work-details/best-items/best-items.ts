import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BestItems page  ->  route "/works/100-best-items"
// - Markup lives in best-items.html (edit text/images there)
@Component({
  selector: 'app-best-items',
  imports: PAGE_IMPORTS,
  templateUrl: './best-items.html',
})
export class BestItems {}
