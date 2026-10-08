import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// WorldItems page  ->  route "/works/world-items"
// - Markup lives in world-items.html (edit text/images there)
@Component({
  selector: 'app-world-items',
  imports: PAGE_IMPORTS,
  templateUrl: './world-items.html',
})
export class WorldItems {}
