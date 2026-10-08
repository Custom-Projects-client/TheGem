import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BrandingTools page  ->  route "/works/branding-tools"
// - Markup lives in branding-tools.html (edit text/images there)
@Component({
  selector: 'app-branding-tools',
  imports: PAGE_IMPORTS,
  templateUrl: './branding-tools.html',
})
export class BrandingTools {}
