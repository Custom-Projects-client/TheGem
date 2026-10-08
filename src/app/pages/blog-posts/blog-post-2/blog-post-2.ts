import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BlogPost2 page  ->  route "/blog/blog-post-2"
// - Markup lives in blog-post-2.html (edit text/images there)
@Component({
  selector: 'app-blog-post-2',
  imports: PAGE_IMPORTS,
  templateUrl: './blog-post-2.html',
})
export class BlogPost2 {}
