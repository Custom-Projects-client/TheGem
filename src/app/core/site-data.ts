// Site-wide data. Edit here -> header menu updates on every page.

export interface MenuItem {
  label: string;
  link: string; // router path, e.g. '/about-us'
  children?: MenuItem[]; // optional sub-menu
}

export const MENU: MenuItem[] = [
  {
    label: 'About Us',
    link: '/about-us',
    children: [
      { label: 'About Our Agency', link: '/about-us' },
      { label: 'Our Team', link: '/our-team' },
      { label: 'Our Clients', link: '/our-clients' },
    ],
  },
  {
    label: 'Services',
    link: '/services',
    children: [
      { label: 'Our Services', link: '/services' },
      { label: 'Service Page', link: '/service-page' },
    ],
  },
  {
    label: 'Works',
    link: '/works',
    children: [
      { label: 'Our Works', link: '/works' },
      { label: 'Work Example 1', link: '/works/our-work-1' },
      { label: 'Work Example 2', link: '/works/our-work-2' },
      { label: 'Work Example 3', link: '/works/our-work-3' },
    ],
  },
  {
    label: 'Blog',
    link: '/blog',
    children: [
      { label: 'Our Blog', link: '/blog' },
      { label: 'Blog Post 1', link: '/blog/text-blog-post' },
      { label: 'Blog Post 2', link: '/blog/blog-post-1' },
      { label: 'Blog Post 3', link: '/blog/blog-post-2' },
    ],
  },
  { label: 'Contact Us', link: '/contact-us' },
];

// Social icons in the menu. Replace '#' with your real profile URLs.
export const SOCIALS = [
  { name: 'Facebook', icon: 'facebook', url: '#' },
  { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  { name: 'Twitter', icon: 'twitter', url: '#' },
  { name: 'Instagram', icon: 'instagram', url: '#' },
  { name: 'Pinterest', icon: 'pinterest', url: '#' },
  { name: 'YouTube', icon: 'youtube', url: '#' },
];
