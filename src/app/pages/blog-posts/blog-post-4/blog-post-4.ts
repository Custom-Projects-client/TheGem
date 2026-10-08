import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BlogPost4 page  ->  route "/blog/blog-post-4"
// - Markup lives in blog-post-4.html (edit text/images there)
@Component({
  selector: 'app-blog-post-4',
  imports: PAGE_IMPORTS,
  templateUrl: './blog-post-4.html',
})
export class BlogPost4 {}
