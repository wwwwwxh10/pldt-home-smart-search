export const NAV_SECTIONS = [
  {
    key: 'internet',
    title: 'INTERNET',
    subtitle: 'Home & Home Biz',
    href: '/internet',
    groups: [
      {
        title: 'HOME INTERNET',
        subtitle: 'Best for the family',
        icon: 'menu-home-internet.svg',
        items: [
          { title: 'Fiber Unli All Plans', description: 'Unli Internet + Cignal TV + Unli Calls', href: '/fiber-unli-all' },
          { title: 'Fiber Netflix Plans', description: 'Unli Internet + Netflix', href: '/fiber-netflix' },
          { title: 'Fiber Unli Plans', description: 'Unli Internet', href: '/fiber' },
          { title: 'Fiber Prepaid', description: 'Unli Internet Prepaid', href: '/prepaidfiber' },
          { title: 'Upgrade my Home Fiber Plan', description: 'Get faster speeds and better bundles', href: '/fiber-upgrade' },
        ],
      },
      {
        title: 'HOME BIZ INTERNET',
        subtitle: 'Best for home-based businesses',
        icon: 'menu-homebiz-internet.svg',
        items: [
          { title: 'Fiber Biz Plans', description: 'Reliable connectivity for your business', href: '/biz' },
        ],
      },
    ],
  },
  {
    key: 'addons',
    title: 'ADD-ONS',
    subtitle: 'Digital Services & Devices',
    href: '/addons',
    groups: [
      {
        title: 'CONNECTIVITY',
        subtitle: 'Best for seamless connectivity',
        icon: 'menu-connectivity.svg',
        items: [
          { title: 'Always On', description: 'Backup connectivity when you need it', href: '/alwayson' },
          { title: 'WiFi Mesh Systems', description: 'Reliable whole-home WiFi coverage', href: '/wifimeshsystem' },
          { title: 'Landline', description: 'Stay connected with clear voice calls', href: '/landline' },
        ],
      },
      {
        title: 'ENTERTAINMENT',
        subtitle: 'Best for video and gaming',
        href: '/entertainment',
        icon: 'menu-entertainment.svg',
        items: [
          { title: 'Netflix', description: 'Movies and series for every mood', href: '/netflix', label: 'STREAMING & PAY TV' },
          { title: 'HBO Max', description: 'Premium series, movies and originals', href: '/max' },
          { title: 'Viu', description: 'Asian entertainment and K-dramas', href: '/viu' },
          { title: 'Cignal', description: 'Live TV channels for the whole family', href: '/cignal' },
          { title: 'StreamTV', description: 'Cinema in a box', href: '/streamtv', label: 'ENTERTAINMENT HUB' },
          { title: 'Unli Gaming', description: 'Low-latency gaming bundles', href: '/unligaming', label: 'GAMING' },
        ],
      },
      {
        title: 'SMART HOME',
        subtitle: 'Best for safety and control',
        href: '/smarthome',
        icon: 'menu-smart.png',
        items: [
          { title: 'Starter Kit', description: 'Start building your connected home', href: '/smarthome/starter-kit', label: 'SMART HOME KIT' },
          { title: 'Cameras', description: 'Monitor your home from anywhere', href: '/security/cameras', label: 'SECURITY' },
          { title: 'Door Lock', description: 'Smart access and added peace of mind', href: '/security/door-lock' },
        ],
      },
      {
        title: 'HEALTH',
        subtitle: 'Healthcare support for the whole family',
        icon: 'menu-health.svg',
        items: [
          { title: 'mWell', description: 'Make health part of your plan', href: '/mwell' },
        ],
      },
    ],
  },
  { key: 'promos', title: 'PROMOS', subtitle: 'Best Deals', href: '/whatsnew' },
  { key: 'support', title: 'SUPPORT', subtitle: 'Guide & Helpline', href: '/support' },
];

const TOP_LEVEL_PAGES = [
  { title: 'Internet', category: 'Home & Home Biz', description: 'Unlock a world of possibilities with fiber-fast, reliable broadband.', href: '/internet', theme: 'internet' },
  { title: 'Add-ons', category: 'Digital Services & Devices', description: 'Make your connected home more reliable, entertaining and secure.', href: '/addons', theme: 'addons' },
  { title: 'Promos', category: 'Best Deals', description: 'Discover the latest PLDT Home offers and exclusive bundles.', href: '/whatsnew', theme: 'promos' },
  { title: 'Support', category: 'Guide & Helpline', description: 'Get answers, account help and troubleshooting guidance.', href: '/support', theme: 'support' },
  { title: 'Rewards', category: 'Loyalty Program', description: 'Enjoy exclusive privileges made for PLDT Home customers.', href: '/rewards', theme: 'rewards' },
];

const UTILITY_PAGES = [
  { title: 'Plan Recommender', category: 'Internet', description: 'Find a PLDT Home plan that fits your household.', href: '/plan-recommender', theme: 'internet' },
  { title: 'Track My PLDT Home Request', category: 'Support', description: 'Check the progress of your application or service request.', href: '/pldt-tracker', theme: 'support' },
  { title: 'Report a Service Issue', category: 'Support', description: 'Diagnose connection concerns and get the right support.', href: '/troubleshooting-landing', theme: 'support' },
  { title: 'Fiber Sale Mechanics', category: 'Promos', description: 'See the current installation offer and complete promo mechanics.', href: '/fiber-sale-mechanics-2026', theme: 'promos' },
  { title: 'About Us', category: 'Inside PLDT', description: 'Learn about the people and network behind PLDT Home.', href: '/about-us', theme: 'company' },
  { title: 'News', category: 'Inside PLDT', description: 'Read the latest PLDT Home updates and announcements.', href: '/news-media', theme: 'company' },
  { title: 'Loyalty and Rewards', category: 'Rewards', description: 'Explore benefits and experiences for loyal customers.', href: '/loyalty-and-rewards', theme: 'rewards' },
  { title: 'Store Locator', category: 'Contact', description: 'Find a PLDT store near you.', href: '/store-locator', theme: 'support' },
  { title: 'Contact Us', category: 'Support', description: 'Choose the best way to reach PLDT Home.', href: '/contact', theme: 'support' },
  { title: 'Privacy Policy', category: 'Legal', description: 'Learn how PLDT handles and protects personal information.', href: '/privacypolicy', theme: 'company' },
  { title: 'Cookie Policy', category: 'Legal', description: 'Learn how cookies are used across PLDT Home digital services.', href: '/cookie-policy', theme: 'company' },
];

const themeByGroup = {
  internet: 'internet',
  addons: 'addons',
  CONNECTIVITY: 'addons',
  ENTERTAINMENT: 'entertainment',
  'SMART HOME': 'smarthome',
  HEALTH: 'health',
};

const NAV_CHILD_PAGES = NAV_SECTIONS.flatMap((section) =>
  (section.groups || []).flatMap((group) => {
    const category = group.title.replace('HOME INTERNET', 'Internet').replace('HOME BIZ INTERNET', 'Home Biz');
    const groupPage = group.href ? [{ title: group.title.replace('SMART HOME', 'Smart Home').replace('ENTERTAINMENT', 'Entertainment'), category: section.title, description: group.subtitle, href: group.href, theme: themeByGroup[group.title] }] : [];
    return [
      ...groupPage,
      ...group.items.map((item) => ({
        ...item,
        category,
        theme: themeByGroup[group.title] || themeByGroup[section.key] || 'internet',
      })),
    ];
  }),
);

const ALIAS_PAGES = [
  { title: 'Fiber Prepaid', category: 'Internet', description: 'Unli Internet Prepaid', href: '/fiberprepaid', canonical: '/fiberprepaid', theme: 'internet' },
  { title: 'HBO Max', category: 'Entertainment', description: 'Premium series, movies and originals', href: '/hbomax', canonical: '/hbomax', theme: 'entertainment' },
];

export const SITE_PAGES = [...TOP_LEVEL_PAGES, ...NAV_CHILD_PAGES, ...UTILITY_PAGES, ...ALIAS_PAGES];

export const PAGE_BY_PATH = Object.fromEntries(SITE_PAGES.map((page) => [page.href, page]));

export function pageForPath(pathname) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return PAGE_BY_PATH[normalized] || null;
}
