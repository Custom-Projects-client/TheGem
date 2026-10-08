import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// Services page  ->  route "/services"
// - Markup lives in services.html (edit text/images there)
@Component({
  selector: 'app-services',
  imports: PAGE_IMPORTS,
  templateUrl: './services.html',
})
export class Services {}
