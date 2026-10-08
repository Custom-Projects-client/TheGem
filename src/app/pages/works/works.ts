import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// Works page  ->  route "/works"
// - Markup lives in works.html (edit text/images there)
@Component({
  selector: 'app-works',
  imports: PAGE_IMPORTS,
  templateUrl: './works.html',
})
export class Works {}
