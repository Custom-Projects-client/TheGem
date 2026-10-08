import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// LetsGetMoney page  ->  route "/works/lets-get-money"
// - Markup lives in lets-get-money.html (edit text/images there)
@Component({
  selector: 'app-lets-get-money',
  imports: PAGE_IMPORTS,
  templateUrl: './lets-get-money.html',
})
export class LetsGetMoney {}
