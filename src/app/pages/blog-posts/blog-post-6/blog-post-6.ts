import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BlogPost6 page  ->  route "/blog/blog-post-6"
// - Markup lives in blog-post-6.html (edit text/images there)
@Component({
  selector: 'app-blog-post-6',
  imports: PAGE_IMPORTS,
  templateUrl: './blog-post-6.html',
})
export class BlogPost6 {}
