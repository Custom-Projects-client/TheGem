import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BlogPost1 page  ->  route "/blog/blog-post-1"
// - Markup lives in blog-post-1.html (edit text/images there)
@Component({
  selector: 'app-blog-post-1',
  imports: PAGE_IMPORTS,
  templateUrl: './blog-post-1.html',
})
export class BlogPost1 {}
