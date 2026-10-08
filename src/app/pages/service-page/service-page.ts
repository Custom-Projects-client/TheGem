import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// ServicePage page  ->  route "/service-page"
// - Markup lives in service-page.html (edit text/images there)
@Component({
  selector: 'app-service-page',
  imports: PAGE_IMPORTS,
  templateUrl: './service-page.html',
})
export class ServicePage {}
