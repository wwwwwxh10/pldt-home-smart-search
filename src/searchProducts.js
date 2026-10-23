export const FIBER_PLANS = [
  {
    name: 'Fiber Unli 1299', price: '₱1,299', speed: '100 Mbps',
    bestFor: 'A practical choice for smaller households focused on browsing, HD streaming, and everyday work or school.',
    href: 'https://pldthomefiber-unli1299.zite.so/',
  },
  {
    name: 'Fiber Unli 1699', price: '₱1,699', speed: '300 Mbps', badge: 'MOST POPULAR', gamePass: true,
    bestFor: 'The best all-around starting point for families using several devices for streaming, gaming, and video calls.',
    href: 'https://pldthomefiber-unli1699.zite.so/',
  },
  {
    name: 'Fiber Unli 2099', price: '₱2,099', speed: '500 Mbps', gamePass: true,
    bestFor: 'Best suited to larger or heavier-use households with many simultaneous connections and frequent large downloads.',
    href: 'https://pldthomefiber-unli2099.zite.so/',
  },
];

const PREPAID_TIERS = [
  { speed: '50 Mbps', prices: ['₱50', '₱199', '₱379', '₱699', '₱6,999'] },
  { speed: '100 Mbps', isNew: true, prices: ['₱99', '₱379', '₱549', '₱999', '₱9,999'] },
  { speed: '300 Mbps', isNew: true, prices: ['₱199', '₱699', '₱999', '₱1,499', '₱14,999'] },
];

const CAMERAS = [
  {
    name: 'Tapo Indoor Camera C110', image: 'cameras-product-tapo.png',
    description: 'Indoor safety and security 24/7 while you’re away from home.',
    price: '₱89', term: '24 months', cash: '₱1,099/pc',
    features: ['2K crystal-clear video', 'Built-in AI detection', 'Two-way audio'],
    href: 'https://pldthome.com/security/cameras/tapo-indoor-camera-application',
  },
  {
    name: 'eufy Outdoor Cam 2C Pro', image: 'cameras-product-outdoor.png',
    description: 'Outdoor safety and security for your home perimeter, day and night.',
    price: '₱789', term: '36 months', cash: '₱20,995/set',
    features: ['2K video & LED spotlight', 'IP67 weatherproof', 'Up to 180-day battery life'],
    href: 'https://pldthome.com/security/cameras/eufy-outdoor-camera-application',
  },
  {
    name: 'eufy Indoor Camera C220', image: 'cameras-product-indoor.png',
    description: 'Indoor safety and security 24/7 while you’re away from home.',
    price: '₱119', term: '36 months', cash: '₱2,299/pc',
    features: ['2K crystal-clear video', 'Built-in AI detection', '360° pan & tilt'],
    href: 'https://pldthome.com/security/cameras/eufy-indoor-camera-application',
  },
];

const DOOR_LOCK = {
  name: 'eufy Smart Door Lock', image: 'doorlock-product.png',
  description: 'Front door security and control 24/7, from anywhere.',
  price: '₱649', term: '24 months', cash: '₱13,299/pc',
  features: ['Multiple ways to unlock', 'Control from anywhere', 'Auto-lock', 'Wireless & weatherproof'],
  outOfStock: true, href: 'https://pldthome.com/security/door-lock',
};

const FEATURES = {
  'fiber unli plans': {
    key: 'fiber', title: 'Fiber Unli Plans', href: '/fiber', defaultIndex: 1,
    items: FIBER_PLANS,
    relatedPaths: ['/fiber-unli-all', '/fiber-netflix', '/fiber-upgrade', '/plan-recommender', '/fiber-sale-mechanics-2026'],
  },
  'fiber prepaid': {
    key: 'prepaid', title: 'Fiber Prepaid', href: '/prepaidfiber', defaultIndex: 1,
    items: PREPAID_TIERS,
    relatedPaths: ['/fiber', '/plan-recommender', '/support', '/contact'],
  },
  cameras: {
    key: 'cameras', title: 'Cameras', href: '/security/cameras', defaultIndex: 0,
    items: CAMERAS,
    relatedPaths: ['/smarthome', '/smarthome/starter-kit', '/security/door-lock', '/addons', '/support'],
  },
  'door lock': {
    key: 'doorlock', title: 'Door Lock', href: '/security/door-lock', defaultIndex: 0,
    items: [DOOR_LOCK],
    relatedPaths: ['/smarthome', '/security/cameras', '/smarthome/starter-kit', '/addons', '/support'],
  },
};

export function searchProductFeature(query) {
  const key = query.trim().toLowerCase().replace(/\s+/g, ' ');
  return Object.hasOwn(FEATURES, key) ? FEATURES[key] : null;
}

export const PREPAID_LOAD_URL = 'https://pldthome.info/prepaidload';
export const PREPAID_VALIDITIES = ['1 DAY', '7 DAYS', '15 DAYS', '30 DAYS', '365 DAYS'];
