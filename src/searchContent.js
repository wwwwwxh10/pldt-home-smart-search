import { presentationForPath } from './pagePresentations';

const SEARCH_SUMMARIES = {
  '/fiber': 'Explore unlimited fiber internet for streaming, video calls, working from home and everyday browsing. Compare PLDT Home Fiber Unli plans and choose the connectivity that fits your household and connected devices.',
  '/fiberprepaid': 'Get unlimited fiber internet with a prepaid option for your household. Explore PLDT Home Fiber Prepaid, learn how the service works and review the available offer before choosing your home connection.',
  '/internet': 'Compare PLDT Home internet options for families and home-based businesses. Explore unlimited fiber, entertainment bundles, prepaid connectivity and plan upgrades to find a service suited to how you work, stream and connect.',
  '/addons': 'Explore digital services and devices that complement your PLDT Home connection. Browse WiFi mesh and backup connectivity, streaming subscriptions, smart home security and family wellness services in one place.',
  '/security/cameras': 'Keep an eye on what matters most with PLDT Home security cameras. Explore connected cameras for monitoring your home and loved ones, and review the available devices and options for your smart home setup.',
  '/security/door-lock': 'Explore smart door locks that add control and peace of mind to your home. Learn about connected access and security options, and review the available devices before choosing a lock for your household.',
  '/whatsnew': 'Discover current PLDT Home promotions, special offers and service bundles. Browse the latest internet, entertainment and connected-home deals, then open each offer to review its inclusions, eligibility and mechanics.',
  '/support': 'Find help for your PLDT Home connection, account and services. Explore troubleshooting guidance, check an existing request or choose the right support channel for questions about your home internet.',
  '/rewards': 'Explore privileges and experiences available to PLDT Home customers. Discover loyalty benefits and reward offers, and review the details and eligibility for the benefits that interest you.',
  '/plan-recommender': 'Find a PLDT Home plan that fits your household and how you use the internet. Explore recommendations for everyday browsing, entertainment, working from home and connecting multiple devices.',
  '/pldt-tracker': 'Check the progress of a PLDT Home application or service request. Open the request tracker to view the available tracking options and follow up on an existing request through the appropriate support channel.',
  '/troubleshooting-landing': 'Get guidance for a PLDT Home service concern. Explore connection troubleshooting and support options to help identify an internet issue and find the next step for reporting or resolving it.',
  '/fiber-sale-mechanics-2026': 'Review the Fiber installation promotion and its complete mechanics. Check the qualifying plan information, offer inclusions and applicable terms before applying for a new PLDT Home Fiber connection.',
  '/about-us': 'Learn about PLDT Home and the people and network behind its services. Explore information about the company and its role in connecting households through internet, communication and digital services.',
  '/news-media': 'Read PLDT Home updates and announcements about its services, offers and connected-home experiences. Browse news and discover what is new across internet, entertainment and digital services.',
  '/loyalty-and-rewards': 'Discover benefits and experiences for loyal PLDT Home customers. Explore the loyalty and rewards program, review the available offers and find the details you need to learn more about each benefit.',
  '/store-locator': 'Find a PLDT store near you for in-person assistance. Open the store locator to explore locations and review the available store information before planning a visit for your account or service needs.',
  '/contact': 'Choose the right way to reach PLDT Home for account questions, service concerns and general assistance. Explore contact and support options so your request reaches the appropriate team.',
  '/privacypolicy': 'Learn how PLDT handles and protects personal information across its services. Review the privacy policy for information about data collection, use and protection, along with the privacy choices available to customers.',
  '/cookie-policy': 'Learn how PLDT Home uses cookies across its digital services. Review the cookie policy to understand the role cookies play in site functionality and your browsing experience.',
};

export function searchSummary(page) {
  const path = page.canonical || (page.href === '/prepaidfiber' ? '/fiberprepaid' : page.href);
  if (SEARCH_SUMMARIES[path]) return SEARCH_SUMMARIES[path];
  const presentation = presentationForPath(path);
  if (presentation) return [presentation.subheadline, presentation.sectionCopy, `${presentation.features.slice(0, 3).join('; ')}.`].join(' ');
  return page.description;
}
