export const LIVE_PAGE_CONFIGS = {
  '/fiber-unli-all': {
    layout: 'plans', theme: 'fiber-all', hero: 'hero-fiber-unli-all-desktop.png', heroMobile: 'hero-fiber-unli-all-mobile.png',
    eyebrow: 'PLDT HOME FIBER UNLI ALL', headline: 'Get more for less!', subheadline: 'Unlimited fiber, Cignal TV, HBO Max and calls in one complete plan.', cta: 'CHOOSE A PLAN',
    sectionTitle: 'Fiber Unli All Plans', sectionCopy: 'More speed, more entertainment and more ways to stay connected.',
    offers: [
      { name: 'Fiber Unli All 1499', value: '200 Mbps', price: 'P1,499/mo', details: ['Unlimited Fiber Internet', 'Cignal TV + HBO Max Standard', 'Unli Calls', '9GB Smart mobile data'] },
      { name: 'Fiber Unli All 1899', value: '400 Mbps', price: 'P1,899/mo', badge: 'MOST POPULAR', details: ['Unlimited Fiber Internet', 'Cignal TV + HBO Max Standard', 'Unli Calls', '9GB Smart mobile data'] },
      { name: 'Fiber Unli All 2599', value: '800 Mbps', price: 'P2,599/mo', badge: 'BEST VALUE', details: ['Unlimited Fiber Internet', 'Cignal TV + HBO Max Standard', 'Unli Calls', '9GB Smart mobile data'] },
    ],
    features: ['Free installation and activation', 'Premium entertainment included', 'Fiber-fast connectivity for every device'],
  },
  '/fiber-netflix': {
    layout: 'plans', theme: 'netflix', hero: 'hero-fiber-netflix-live.png', heroMobile: 'hero-fiber-netflix-live-mobile.png',
    eyebrow: 'PLDT HOME FIBER + NETFLIX', headline: 'Amazing entertainment made better!', subheadline: 'Stream your favorites with unlimited fiber internet and Netflix included.', cta: 'GET FIBER NETFLIX',
    sectionTitle: 'Fiber Netflix Plan 1599', sectionCopy: 'Everything your home needs for smooth streaming and everyday connectivity.',
    offers: [{ name: 'Fiber Netflix 1599', value: '200 Mbps', price: 'P1,599/mo', badge: 'ENTERTAINMENT PLAN', details: ['Unlimited Fiber Internet', 'Netflix Basic included', 'Unli Calls', 'Free 1 year IGV Game Pass'] }],
    features: ['Netflix included in one bill', 'Free installation and activation', 'Reliable streaming across multiple devices'],
  },
  '/biz': {
    layout: 'plans', theme: 'biz', hero: 'hero-biz-live.png', heroMobile: 'hero-biz-live-mobile.png',
    eyebrow: 'PLDT HOME BIZ', headline: 'Connecting you to success!', subheadline: 'Grow your home-based business faster with reliable fiber connectivity.', cta: 'VIEW BIZ PLANS',
    sectionTitle: 'Fiber Biz Plans', sectionCopy: 'Built for calls, commerce and the everyday demands of running a business from home.',
    offers: [
      { name: 'Fiber Biz 1699', value: '300 Mbps', price: 'P1,699/mo', details: ['Unlimited Fiber Internet', 'Unli Calls to a Smart or TNT number', 'Business consultation', 'Master classes and FB community'] },
      { name: 'Fiber Biz 2099', value: '500 Mbps', price: 'P2,099/mo', badge: 'FASTER BUSINESS', details: ['Unlimited Fiber Internet', 'Unli Calls to a Smart or TNT number', 'Business consultation', 'Master classes and FB community'] },
    ],
    features: ['Business-grade reliability', 'Support for online selling and meetings', 'Learning resources for entrepreneurs'],
  },
  '/fiber-upgrade': {
    layout: 'builder', theme: 'upgrade', hero: 'hero-upgrade-live.png', heroMobile: 'hero-upgrade-live-mobile.png',
    eyebrow: 'PLDT HOME FIBER UPGRADE', headline: 'BIG on speeds, discounts and bundles', subheadline: 'Upgrade your Fiber Plan and unlock more for your home.', cta: 'BUILD MY UPGRADE',
    sectionTitle: 'Start with your current Fiber plan', sectionCopy: 'Choose your present monthly plan so we can show the right upgrade options.',
    choices: ['P999 and below', 'P1,099 - P1,399', 'P1,499 - P1,899', 'P1,999 - P2,399', 'P2,599 and up'],
    features: ['Higher speeds for more devices', 'Better bundle savings', 'Plans matched to your current subscription'],
  },
  '/alwayson': {
    layout: 'device', theme: 'alwayson', hero: 'hero-alwayson-live.jpg', heroMobile: 'hero-alwayson-live-mobile.png',
    eyebrow: 'PLDT HOME ALWAYS ON', headline: 'Stay connected, whatever happens', subheadline: 'Get backup LTE service in one device to keep your connection going.', cta: 'GET ALWAYS ON',
    sectionTitle: 'Just add P149/mo', sectionCopy: 'Automatic backup connectivity with a WiFi 6 modem, built for uninterrupted days at home.',
    features: ['Automatic Fiber to LTE switching', 'Unlimited LTE backup', 'WiFi 6 modem', 'Automatic service reporting after 15 minutes'],
    offers: [{ name: 'Always On', value: 'Fiber + LTE', price: 'P149/mo', details: ['36-month term', 'Automatic backup connection', 'P150/mo installation and activation'] }],
  },
  '/wifimeshsystem': {
    layout: 'device', theme: 'mesh', hero: 'hero-mesh-live.jpg', heroMobile: 'hero-mesh-live-mobile.png',
    eyebrow: 'PLDT HOME WIFI MESH', headline: 'Every home needs WiFi 6 Mesh', subheadline: 'Enjoy seamless coverage, security and control in every room.', cta: 'GET WIFI MESH',
    sectionTitle: 'TP-Link Deco X50', sectionCopy: 'A three-unit WiFi 6 mesh system designed for larger homes and busy households.',
    features: ['Coverage up to 603 sq.m.', 'AX3000 WiFi 6 speed', 'Connect up to 150 devices', 'Parental controls and device priority'],
    offers: [{ name: 'TP-Link Deco X50', value: '3 units', price: 'P189/mo', details: ['36-month term', 'Also available for P2,999', 'Whole-home seamless coverage'] }],
  },
  '/landline': {
    layout: 'hub', theme: 'landline', hero: 'hero-landline-live.jpg', heroMobile: 'hero-landline-live-mobile.jpg',
    eyebrow: 'PLDT HOME LANDLINE', headline: 'Stronger connections, clearer conversations', subheadline: 'Enjoy the unmatched reliability and clarity of PLDT Landline.', cta: 'EXPLORE LANDLINE',
    sectionTitle: 'Choose how you stay connected', sectionCopy: 'Wired, wireless and value-added calling options for every household.',
    features: ['Call All', 'Landline Plus', 'Wired Landline', 'Wireless Telsets'],
  },
  '/entertainment': {
    layout: 'hub', theme: 'entertainment-hub', hero: 'hero-entertainment-live.png', heroMobile: 'hero-entertainment-live-mobile.png',
    eyebrow: 'PLDT HOME ENTERTAINMENT', headline: 'Entertainment for the whole family', subheadline: 'Premium streaming, live channels and cinema-quality experiences charged to your PLDT bill.', cta: 'SEE ENTERTAINMENT',
    sectionTitle: 'One home, every kind of entertainment', sectionCopy: 'Pick a service and make your Fiber plan even more enjoyable.',
    features: ['Cignal plans from P290', 'Netflix upgrades', 'HBO Max', 'Viu Premium', 'StreamTV+', 'Unli Gaming'],
  },
  '/netflix': {
    layout: 'brand', theme: 'netflix', hero: 'hero-netflix-live.png', heroMobile: 'hero-netflix-live-mobile.png',
    eyebrow: 'NETFLIX ON PLDT HOME', headline: 'Upgrade to the ultimate Netflix experience', subheadline: 'Enjoy more screens, better quality and one convenient PLDT Home bill.', cta: 'UPGRADE NETFLIX',
    sectionTitle: 'Choose your Netflix experience', sectionCopy: 'Save as much as P279 while enjoying your favorite movies and series.',
    offers: [{ name: 'Netflix Standard', value: 'Full HD', price: '+P170/mo', details: ['Watch on 2 supported devices', 'Downloads on 2 devices'] }, { name: 'Netflix Premium', value: 'Ultra HD', price: '+P340/mo', details: ['Watch on 4 supported devices', 'Downloads on 6 devices'] }],
    features: ['One PLDT Home bill', 'Watch on your favorite devices', 'Cancel or change when eligible'],
  },
  '/max': {
    layout: 'brand', theme: 'max', hero: 'hero-hbomax-live.png', heroMobile: 'hero-hbomax-live-mobile.png',
    eyebrow: 'HBO MAX ON PLDT HOME', headline: 'Experience HBO Max with Fiber Unli All', subheadline: 'Fresh stories, iconic entertainment and family favorites on every screen.', cta: 'DISCOVER HBO MAX',
    sectionTitle: 'Premium entertainment reigns', sectionCopy: 'A personalized experience for adults, kids and every fan in the family.',
    features: ['Fresh stories and originals', 'Personalized profiles', 'Multiple supported devices', 'Dedicated kids experience'],
  },
  '/viu': {
    layout: 'brand', theme: 'viu', hero: 'hero-viu-live.jpg', heroMobile: 'hero-viu-live-mobile.png',
    eyebrow: 'VIU PREMIUM', headline: 'Discover the latest Asian entertainment', subheadline: 'Watch fresh K-dramas, variety shows and more for P129/month.', cta: 'SUBSCRIBE TO VIU',
    sectionTitle: 'More shows, fewer interruptions', sectionCopy: 'Enjoy premium viewing at home and on the go.',
    features: ['Premium Asian content', 'Download and watch offline', 'No ads', '1080p Full HD', 'Fresh episodes in as fast as 8 hours', 'TV casting'],
  },
  '/cignal': {
    layout: 'brand', theme: 'cignal', hero: 'hero-cignal-live.png', heroMobile: 'hero-cignal-live-mobile.png',
    eyebrow: 'CIGNAL ON PLDT HOME', headline: 'Awesome HD sports, movies and series', subheadline: 'Bring live channels home with Cignal plans starting at P290.', cta: 'VIEW CIGNAL PLANS',
    sectionTitle: 'A plan for every kind of viewer', sectionCopy: 'Choose from flexible channel lineups and add-ons, all on your PLDT bill.',
    offers: [{ name: 'Cignal Plan 290', value: '55 channels', price: 'P290/mo', details: ['SD and HD channels', 'Family entertainment'] }, { name: 'Cignal Plan 720', value: '100+ channels', price: 'P720/mo', details: ['More sports and movies', 'HD channel selection'] }, { name: 'Cignal Plan 1,990', value: 'Premium lineup', price: 'P1,990/mo', details: ['Extensive HD selection', 'Premium entertainment'] }],
    features: ['Live sports', 'Movies and series', 'Cignal Play access'],
  },
  '/streamtv': {
    layout: 'device', theme: 'streamtv', hero: 'hero-streamtv-live.png', heroMobile: 'hero-streamtv-live-mobile.png',
    eyebrow: 'PLDT HOME STREAMTV+', headline: 'Cinema in a box', subheadline: 'Amazing video, enhanced sound and effortless voice control.', cta: 'GET STREAMTV+',
    sectionTitle: 'Watch. Listen. Speak.', sectionCopy: 'A complete 4K entertainment hub with premium audio and Google Assistant.',
    features: ['4K + Dolby Vision', 'Dolby Atmos + Bang & Olufsen sound', 'Google Assistant voice control', 'Simple five-step setup'],
    offers: [{ name: 'StreamTV+', value: '4K entertainment hub', price: 'P399/mo', details: ['36-month term', 'Also available for P10,990', 'Video, sound and voice in one device'] }],
  },
  '/unligaming': {
    layout: 'brand', theme: 'gaming', hero: 'hero-unligaming-live.png', heroMobile: 'hero-unligaming-live-mobile.png',
    eyebrow: 'IGV GAME PASS', headline: 'All-access. Unlimited gaming.', subheadline: 'Play more than 200 AAA and indie PC games with PLDT Home Fiber.', cta: 'GET GAME PASS',
    sectionTitle: 'Built for PC gamers', sectionCopy: 'A growing game library with no per-title purchases and smooth Fiber connectivity.',
    features: ['200+ games', 'AAA and indie titles', 'One year free on eligible new Fiber plans'],
  },
  '/smarthome': {
    layout: 'hub', theme: 'smarthome-hub', hero: 'hero-smarthome-live.png', heroMobile: 'hero-smarthome-live-mobile.png',
    eyebrow: 'PLDT SMART HOME', headline: 'Connect to a brighter Smart Home', subheadline: 'Security, control and peace of mind in one connected household.', cta: 'EXPLORE SMART HOME',
    sectionTitle: 'A smarter way to look after home', sectionCopy: 'Build your setup one solution at a time.',
    features: ['Starter Kit - Smart, Secure and Seamless', 'Cameras - Keep an eye on what matters most', 'Door Lock - Safer as you brave the world'],
  },
  '/smarthome/starter-kit': {
    layout: 'device', theme: 'starter-kit', hero: 'hero-starterkit-live.png', heroMobile: 'hero-starterkit-live-mobile.png',
    eyebrow: 'PLDT SMART HOME STARTER KIT', headline: 'Your smart home in one kit', subheadline: 'Complete security with home automation support in one app.', cta: 'GET THE STARTER KIT',
    sectionTitle: 'One kit. One app. Complete control.', sectionCopy: 'Six Tapo devices to help automate, monitor and secure your home.',
    features: ['Complete security', 'One kit, one app', 'Home automation ready', 'Six connected Tapo devices'],
    offers: [{ name: 'Smart Home Starter Kit', value: '6 devices', price: 'P199/mo', details: ['36-month term', 'Also available for P4,999', 'Control everything in the Tapo app'] }],
  },
  '/mwell': {
    layout: 'brand', theme: 'mwell', hero: 'hero-mwell-live.png', heroMobile: 'hero-mwell-live-mobile.png',
    eyebrow: 'MWELL FAMILY PLAN', headline: 'Make health part of your plan', subheadline: 'Wellness support for up to four family members, right from home.', cta: 'GET MWELL',
    sectionTitle: 'Family wellness for P399/month', sectionCopy: 'Add mWell to an eligible Fiber plan and care for your family in one dashboard.',
    features: ['24/7 GP and mental health consultations', 'P20,000 accident insurance', 'Prestige Smart Watch', 'Family wellness dashboard'],
  },
};

export function presentationForPath(path) {
  const aliases = { '/hbomax': '/max' };
  return LIVE_PAGE_CONFIGS[path] || LIVE_PAGE_CONFIGS[aliases[path]] || null;
}
