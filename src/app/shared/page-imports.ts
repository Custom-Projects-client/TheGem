import { RouterLink } from '@angular/router';

import { ContactForm } from './contact-form/contact-form';
import { Counter } from './directives/counter';
import { DiagramCircle } from './directives/diagram-circle';
import { Fullwidth } from './directives/fullwidth';
import { HoverStyle } from './directives/hover-style';
import { ItemAnimation } from './directives/item-animation';
import { LazyGroup } from './directives/lazy-group';
import { Lightbox } from './directives/lightbox';
import { Parallax } from './directives/parallax';
import { Quickfinder } from './directives/quickfinder';
import { SkillBar } from './directives/skill-bar';
import { Testimonials } from './directives/testimonials';

// Everything a page template may use. Each page does: imports: PAGE_IMPORTS
// - RouterLink      -> routerLink="/x" links
// - ContactForm     -> <app-contact-form>
// - the directives  -> attach automatically by CSS class / attribute (see each file)
export const PAGE_IMPORTS = [
  RouterLink,
  ContactForm,
  Counter,
  DiagramCircle,
  Fullwidth,
  HoverStyle,
  ItemAnimation,
  LazyGroup,
  Lightbox,
  Parallax,
  Quickfinder,
  SkillBar,
  Testimonials,
];
