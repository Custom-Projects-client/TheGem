import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// BlogPost4B page  ->  route "/blog/blog-post-4-2"
// - Markup lives in blog-post-4-2.html (edit text/images there)
@Component({
  selector: 'app-blog-post-4-2',
  imports: PAGE_IMPORTS,
  templateUrl: './blog-post-4-2.html',
})
export class BlogPost4B {}
