import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// OurClients page  ->  route "/our-clients"
// - Markup lives in our-clients.html (edit text/images there)
@Component({
  selector: 'app-our-clients',
  imports: PAGE_IMPORTS,
  templateUrl: './our-clients.html',
})
export class OurClients {}
