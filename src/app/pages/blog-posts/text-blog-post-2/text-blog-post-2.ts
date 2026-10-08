import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// TextBlogPost2 page  ->  route "/blog/text-blog-post-2"
// - Markup lives in text-blog-post-2.html (edit text/images there)
@Component({
  selector: 'app-text-blog-post-2',
  imports: PAGE_IMPORTS,
  templateUrl: './text-blog-post-2.html',
})
export class TextBlogPost2 {}
