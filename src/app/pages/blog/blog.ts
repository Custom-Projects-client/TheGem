import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// Blog page  ->  route "/blog"
// - Markup lives in blog.html (edit text/images there)
@Component({
  selector: 'app-blog',
  imports: PAGE_IMPORTS,
  templateUrl: './blog.html',
})
export class Blog {}
