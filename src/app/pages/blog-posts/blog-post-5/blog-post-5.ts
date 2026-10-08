import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BlogPost5 page  ->  route "/blog/blog-post-5"
// - Markup lives in blog-post-5.html (edit text/images there)
@Component({
  selector: 'app-blog-post-5',
  imports: PAGE_IMPORTS,
  templateUrl: './blog-post-5.html',
})
export class BlogPost5 {}
