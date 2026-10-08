import { Component } from '@angular/core';
import { PAGE_IMPORTS } from '../../shared/page-imports';

// OurTeam page  ->  route "/our-team"
// - Markup lives in our-team.html (edit text/images there)
@Component({
  selector: 'app-our-team',
  imports: PAGE_IMPORTS,
  templateUrl: './our-team.html',
})
export class OurTeam {}
