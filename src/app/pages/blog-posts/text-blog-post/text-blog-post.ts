import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../../shared/page-imports';

// TextBlogPost page  ->  route "/blog/text-blog-post"
// - Markup lives in text-blog-post.html (edit text/images there)
@Component({
  selector: 'app-text-blog-post',
  imports: PAGE_IMPORTS,
  templateUrl: './text-blog-post.html',
})
export class TextBlogPost {}
