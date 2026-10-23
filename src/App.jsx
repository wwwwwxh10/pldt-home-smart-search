import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Breadcrumb, Button, Carousel, Checkbox, Empty, Input, Pagination } from '@arco-design/web-react';
import {
  IconClose,
  IconDelete,
  IconDown,
  IconBulb,
  IconLocation,
  IconMenu,
  IconRight,
  IconRobot,
  IconSearch,
  IconSettings,
  IconThumbDown,
  IconThumbUp,
  IconThunderbolt,
  IconUser,
  IconVoice,
  IconWifi,
} from '@arco-design/web-react/icon';
import { NAV_SECTIONS, SITE_PAGES, pageForPath } from './siteData';
import { presentationForPath } from './pagePresentations';
import FiberPlansPageV2 from './pages/FiberPlansPage';
import PrepaidPageV2 from './pages/PrepaidPage';
import SecurityProductPageV2 from './pages/SecurityProductPage';
import { searchSummary } from './searchContent';
import SearchProductFeature from './SearchProductFeature';
import { FIBER_PLANS, searchProductFeature } from './searchProducts';

const A = '/assets/';

const ROUTE_REDIRECTS = {
  '/prepaidfiber': '/fiberprepaid',
  '/max': '/hbomax',
};

const LIVE_DOCUMENT_TITLES = {
  '/fiber': 'Unlimited Fiber Plan | PLDT Home',
  '/fiberprepaid': 'Fiber Prepaid | PLDT Home',
  '/security/cameras': 'Home Security Cameras | PLDT Home',
  '/security/door-lock': 'Smart Door Lock | PLDT Home',
};

const SEARCH_HISTORY_KEY = 'pldt-search-history';
const SEARCH_DISCOVERY = [
  { label: 'Fiber Unli Plans', query: 'Fiber Unli Plans' },
  { label: 'Fiber Prepaid', query: 'Fiber Prepaid' },
  { label: 'Cameras', query: 'Cameras' },
  { label: 'Door Lock', query: 'Door Lock' },
  { label: 'What is the best Fiber plan for me?', query: 'What is the best Fiber plan for me?' },
];
const SEARCH_PAGE_SIZE = 5;
const FIBER_PLAN_RECOMMENDATION_QUERY = 'what is the best fiber plan for me';
const FIBER_PLAN_RECOMMENDATION_PATHS = ['/fiber', '/fiber-unli-all', '/fiber-netflix', '/fiberprepaid', '/plan-recommender'];

function normalizeSearchQuery(query) {
  return query.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

function readSearchHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string').slice(0, 6) : [];
  } catch {
    return [];
  }
}

function canonicalSearchHref(page) {
  return page.canonical || ROUTE_REDIRECTS[page.href] || page.href;
}

function searchPages(query) {
  if (normalizeSearchQuery(query) === FIBER_PLAN_RECOMMENDATION_QUERY) {
    return FIBER_PLAN_RECOMMENDATION_PATHS
      .map((href) => SITE_PAGES.find((page) => page.href === href))
      .filter(Boolean);
  }

  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  const ranked = SITE_PAGES.map((page, index) => {
    const title = page.title.toLowerCase();
    const category = page.category.toLowerCase();
    const description = page.description.toLowerCase();
    const haystack = `${title} ${category} ${description}`;
    const score = tokens.reduce((total, token) => total
      + (title.includes(token) ? 8 : 0)
      + (category.includes(token) ? 4 : 0)
      + (description.includes(token) ? 2 : 0)
      + (haystack.includes(token) ? 1 : 0), 0)
      + (title === query.trim().toLowerCase() ? 24 : 0);
    return { page, index, score };
  }).filter(({ score }) => score > 0);

  const seen = new Set();
  return ranked
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ page }) => page)
    .filter((page) => {
      const href = canonicalSearchHref(page);
      if (seen.has(href)) return false;
      seen.add(href);
      return true;
    });
}

function buildAiOverview(query, results) {
  const normalizedQuery = normalizeSearchQuery(query);
  const lowerQuery = query.toLowerCase();
  const topResults = results.slice(0, 3);
  if (normalizedQuery === FIBER_PLAN_RECOMMENDATION_QUERY) {
    const sources = ['/fiber', '/plan-recommender']
      .map((href) => SITE_PAGES.find((page) => page.href === href))
      .filter(Boolean);

    return {
      intro: 'For most multi-device homes, Fiber Unli 1699 is the best place to start: PLDT currently marks it as the most popular option, with up to 300 Mbps at ₱1,699 per month. Your ideal plan still depends on your household size and online activities.',
      bullets: [
        ...FIBER_PLANS.map((plan) => `${plan.name} — ${plan.price} per month for up to ${plan.speed}. ${plan.bestFor}`),
        'All three plans include unlimited fiber internet and a landline with Unli Calls. The current offer also lists free installation and activation, while the 1699 and 2099 plans include a free one-year IGV Game Pass.',
        'Choose 1299 for value, 1699 for the strongest balance of speed and price, or 2099 when many people regularly stream, game, join video calls, and download large files at the same time. Service availability, final fees, and promo eligibility depend on your address and application.',
      ],
      sources,
    };
  }

  let intro = `PLDT Home has ${results.length} ${results.length === 1 ? 'page' : 'pages'} that can help with “${query}”.`;
  if (lowerQuery.includes('fiber')) {
    intro = 'PLDT Home offers several ways to compare fiber connectivity, from unlimited plans to prepaid options and plan recommendations.';
  } else if (lowerQuery.includes('support') || lowerQuery.includes('issue') || lowerQuery.includes('track')) {
    intro = 'PLDT Home support pages help you choose the right channel, troubleshoot a service concern and track an existing request.';
  } else if (lowerQuery.includes('netflix') || lowerQuery.includes('entertainment')) {
    intro = 'PLDT Home entertainment pages bring together streaming, TV and connected-home options that can be paired with your internet plan.';
  }

  return {
    intro,
    bullets: topResults.map((result) => `${result.title}: ${searchSummary(result).replace(/\.$/, '')}.`),
    sources: topResults,
  };
}

function normalizePath(pathname) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return ROUTE_REDIRECTS[normalized] || normalized;
}

function useLocalRouter() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const syncPath = () => {
      const nextPath = normalizePath(window.location.pathname);
      if (nextPath !== window.location.pathname) window.history.replaceState({}, '', nextPath);
      setPathname(nextPath);
    };
    syncPath();
    const onPopState = () => syncPath();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return pathname;
}

function LocalLink({ href, onNavigate, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!href?.startsWith('/') || props.target === '_blank') return;
    event.preventDefault();
    const nextPath = normalizePath(href);
    if (nextPath !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', nextPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    onNavigate?.(nextPath);
  };

  return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}

const slides = [
  {
    desktop: 'hero-mwell-desktop.png', mobile: 'hero-mwell-mobile.png', logo: 'logo-mwell.png',
    logoClass: 'logo-mwell', title: <>MAKE HEALTH<br />PART OF YOUR PLAN</>,
    description: <>Get access to a Family Dashboard to monitor your loved ones'<br className="desktop-only" /> physical and mental wellness.</>,
    cta: 'LEARN MORE', href: '/mwell', tone: 'dark',
  },
  {
    desktop: 'hero-fiber-sale-desktop.png', mobile: 'hero-fiber-sale-mobile.png', logo: 'logo-fiber.png',
    logoClass: 'logo-fiber', title: <>Enjoy FREE installation*<br />and save ₱3,600</>,
    description: 'when you apply for Fiber Plan 1299 and up!', note: '*Applies to broadband only.',
    cta: 'APPLY NOW', href: '/fiber-sale-mechanics-2026', tone: 'dark',
  },
  {
    desktop: 'hero-fiber-upgrade-desktop.png', mobile: 'hero-fiber-upgrade-mobile.png', logo: 'logo-fiber-upgrade.png',
    logoClass: 'logo-upgrade', title: <>BIG on speeds,<br />BIG on discounts,<br />BIG on bundles</>,
    description: 'when you upgrade your Fiber Plan!', cta: 'UPGRADE NOW', href: '/fiber-upgrade', tone: 'light',
  },
  {
    desktop: 'hero-fiber-prepaid-desktop.jpg', mobile: 'hero-fiber-prepaid-mobile.jpg', logo: 'logo-fiber-prepaid.png',
    headlineImage: 'headline-fiber-prepaid.png', logoClass: 'logo-prepaid',
    description: 'Kayang-kaya sabayan ang activities ng buong pamilya for only ₱999!',
    cta: 'MAG-PLDT PREPAID NA', href: '/fiberprepaid', tone: 'dark',
  },
  {
    desktop: 'hero-hbo-desktop.png', mobile: 'hero-hbo-mobile.png', logo: 'logo-hbo.png',
    logoClass: 'logo-hbo', title: <>Experience HBO Max<br />with the New Fiber<br />Unli All Plans</>,
    description: 'where premium entertainment reigns!', cta: 'LEARN MORE', href: '/hbomax', tone: 'light',
  },
  {
    desktop: 'hero-streamtv-desktop.png', mobile: 'hero-streamtv-mobile.png', logo: 'logo-streamtv.png',
    logoClass: 'logo-streamtv', title: 'CINEMA IN A BOX',
    description: 'Amazing video, enhanced sound, and effortless control!', cta: 'GET YOURS TODAY', href: '/streamtv', tone: 'light',
  },
];

const serviceLinks = [
  { icon: <IconWifi />, label: 'RECOMMEND A PLAN FOR ME', href: '/plan-recommender' },
  { icon: <IconThunderbolt />, label: 'UPGRADE MY PLAN', href: '/fiber-upgrade' },
  { icon: <IconLocation />, label: 'TRACK MY PLDTHOME REQUEST', href: '/pldt-tracker' },
  { icon: <IconSettings />, label: 'REPORT A SERVICE ISSUE', href: '/troubleshooting-landing' },
];

const fiberServiceLinks = [
  { icon: <IconWifi />, label: 'Switch to PLDT', href: 'https://www.pldthome.com/switch' },
  { icon: <IconThunderbolt />, label: 'Upgrade my plan', href: '/fiber-upgrade' },
  { icon: <IconLocation />, label: 'Track my application', href: '/pldt-tracker' },
  { icon: <IconBulb />, label: 'Read FAQs or get support', href: '#faqs' },
];

const quickLinks = [
  { image: 'tile-internet.png', title: 'Internet', text: 'Unlock a world of possibilities with our high-speed broadband', href: '/internet' },
  { image: 'tile-promos.png', title: 'Promos', text: "Don’t miss out on these exclusive PLDT Home deals", href: '/whatsnew' },
  { image: 'tile-support.png', title: 'Support', text: 'Get answers and troubleshooting help', href: '/support' },
  { image: 'tile-company.png', title: 'Inside PLDT Inc.', text: 'Discover our mission, values, and the people powering our network', href: 'https://main.pldt.com/' },
];

const footerLinks = [
  ['ABOUT US', '/about-us'], ['NEWS', '/news-media'], ['LOYALTY AND REWARDS', '/loyalty-and-rewards'],
  ['STORE LOCATOR', '/store-locator'], ['CONTACT US', '/contact'], ['PRIVACY POLICY', '/privacypolicy'],
];

const socialLinks = [
  ['facebook.png', 'Facebook', 'https://www.facebook.com/PLDTHome'],
  ['twitter.png', 'Twitter', 'https://twitter.com/pldthome'],
  ['instagram.png', 'Instagram', 'https://instagram.com/pldthome'],
  ['youtube.png', 'YouTube', 'https://www.youtube.com/user/PLDTHome'],
];

function HighlightedSearchText({ text, query }) {
  const phrase = query.trim();
  if (!phrase) return text;
  const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedPhrase})`, 'i'));

  return parts.map((part, index) => part.toLowerCase() === phrase.toLowerCase()
    ? <strong className="search-result__highlight" key={`${part}-${index}`}>{part}</strong>
    : part);
}

function SearchResultLink({ result, query, onNavigate }) {
  const baseSummary = searchSummary(result);
  const phrase = query.trim();
  const lowerPhrase = phrase.toLowerCase();
  const isPlanRecommendation = normalizeSearchQuery(phrase) === FIBER_PLAN_RECOMMENDATION_QUERY;
  let summary = baseSummary;
  if (phrase && !isPlanRecommendation && !baseSummary.toLowerCase().includes(lowerPhrase)) {
    const path = result.canonical || result.href;
    const title = result.title.toLowerCase();
    if (lowerPhrase === 'door lock') {
      const doorLockVariants = {
        '/security/door-lock': `The ${phrase} page covers smart access, remote control and security options for your home. Review unlock methods, app control, automatic locking and weather-ready hardware before choosing a connected entry solution.`,
        '/security/cameras': `Compare connected security devices before choosing a Door Lock or camera for your home. Consider how entry control, monitoring and alerts can work together across the spaces you want to protect.`,
        '/smarthome': `Build a safer connected home with smart devices, including Door Lock options and cameras. Explore practical ways to combine access control, monitoring and everyday automation in one setup.`,
      };
      summary = doorLockVariants[path] || `This ${result.title} page connects with Door Lock planning through related home security and support guidance.`;
    } else if (lowerPhrase === 'cameras' || lowerPhrase === 'camera') {
      const cameraVariants = {
        '/security/cameras': `Explore Cameras for home monitoring, connected alerts and everyday security around your home. Compare indoor and outdoor options, video quality and smart detection features to find the right fit.`,
        '/security/door-lock': `Pair Cameras with smart access controls to build a more complete home security setup. Monitor activity around the home while managing entry points from the same connected lifestyle.`,
        '/smarthome': `Discover connected-home tools that bring Cameras, smart access and control together. Build a setup that helps you watch important spaces, manage entry and stay informed from anywhere.`,
      };
      summary = cameraVariants[path] || (title.includes('support')
        ? `Find support guidance for your PLDT Home service, including help with Cameras and connected devices. Use the available troubleshooting and service information to keep your setup working reliably.`
        : `Review how ${result.title} fits with Cameras and the rest of your connected-home setup. Compare monitoring, access and connected features before deciding what belongs in your home.`);
    } else {
      const variants = [
        `Use ${result.title} to compare ${phrase.toLowerCase()} choices for your home. ${baseSummary}`,
        `${baseSummary} It also helps you evaluate ${phrase.toLowerCase()} options.`,
        `${result.title} includes guidance relevant to ${phrase.toLowerCase()} and connected-home needs. ${baseSummary}`,
      ];
      summary = variants[result.href.length % variants.length];
    }
  }
  if (!isPlanRecommendation && summary.length < 220) {
    const extra = result.description && !summary.includes(result.description) ? result.description : `Explore the details and next steps available on this ${result.category.toLowerCase()} page.`;
    summary = `${summary.replace(/[.!?]$/, '')}. ${extra}`;
  }
  summary = summary.trim().replace(/\s+/g, ' ');
  if (summary && !/[.!?。！？]$/.test(summary)) summary += '.';
  const highlightQuery = isPlanRecommendation ? '' : query;

  return (
    <LocalLink className="search-result" href={result.href} key={result.href} onNavigate={onNavigate}>
      <span className="search-result__copy">
        <span className="search-result__title"><HighlightedSearchText text={result.title} query={highlightQuery} /></span>
        <small><HighlightedSearchText text={summary} query={highlightQuery} /></small>
      </span>
      <span className="search-result__meta">
        <em>{result.category}</em>
        <IconRight aria-hidden="true" />
      </span>
    </LocalLink>
  );
}

function StreamingSummary({ overview, onNavigate }) {
  const [feedback, setFeedback] = useState(null);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const bodyRef = useRef(null);
  const contentRef = useRef(null);
  const bodyId = useId();
  const blocks = [overview.intro, ...overview.bullets];
  const totalCharacters = blocks.reduce((total, block) => total + block.length, 0);
  const finished = visibleCharacters >= totalCharacters;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleCharacters((current) => {
        const next = Math.min(current + 20, totalCharacters);
        if (next === totalCharacters) window.clearInterval(timer);
        return next;
      });
    }, 24);
    return () => window.clearInterval(timer);
  }, [totalCharacters]);

  useEffect(() => {
    const checkOverflow = () => {
      const body = bodyRef.current;
      const content = contentRef.current;
      if (!body || !content) return;
      const collapsedHeight = Number.parseFloat(window.getComputedStyle(body).getPropertyValue('--ai-summary-collapsed-height'));
      setHasOverflow(content.scrollHeight > collapsedHeight + 2);
    };
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(bodyRef.current);
    observer.observe(contentRef.current);
    checkOverflow();
    return () => observer.disconnect();
  }, []);

  const toggleExpanded = () => {
    setExpanded((current) => !current);
  };

  let remainingCharacters = visibleCharacters;
  const visibleBlocks = blocks.map((block) => {
    const visible = block.slice(0, Math.max(0, remainingCharacters));
    remainingCharacters -= block.length;
    return visible;
  });

  return (
    <section className={`ai-summary ${finished ? '' : 'is-streaming'} ${expanded ? 'is-expanded' : ''} ${hasOverflow ? 'has-overflow' : ''}`} aria-label="AI Summary">
      <div className="ai-summary__heading">
        <IconRobot aria-hidden="true" /><h3>AI Summary</h3>
        <span role="status">{finished ? 'Based on PLDT Home pages' : 'Summarizing…'}</span>
      </div>
      <div className="ai-summary__preview">
        <div ref={bodyRef} id={bodyId} className="ai-summary__body" role="region" aria-label={expanded ? 'Full AI summary' : 'AI summary preview'} aria-busy={!finished}>
          <div ref={contentRef}>
            {visibleBlocks[0] && <p>{visibleBlocks[0]}</p>}
            {visibleBlocks.some((block, index) => index > 0 && block) && <ul>{visibleBlocks.slice(1).map((block, index) => block && <li key={index}>{block}</li>)}</ul>}
            {!finished && <span className="ai-summary__cursor" aria-hidden="true" />}
          </div>
        </div>
        {hasOverflow && (
          <button
            className="ai-summary__toggle"
            type="button"
            title={expanded ? 'Show less' : 'Read full summary'}
            aria-label={expanded ? 'Show less' : 'Read full summary'}
            aria-expanded={expanded}
            aria-controls={bodyId}
            onClick={toggleExpanded}
          >
            <IconDown aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="ai-summary__footer">
        <div className="ai-summary__sources"><span>Sources</span>{overview.sources.map((source, index) => <LocalLink href={source.href} key={source.href} onNavigate={onNavigate}><b>[{index + 1}]</b> {source.title}</LocalLink>)}</div>
        <small>AI-generated content. For reference only.</small>
        {finished && <span className="ai-feedback" aria-label="Rate this summary">
          <Button type="text" icon={<IconThumbUp />} iconOnly title="Helpful" className={feedback === 'up' ? 'selected' : ''} aria-label="Helpful" aria-pressed={feedback === 'up'} onClick={() => setFeedback(feedback === 'up' ? null : 'up')} />
          <Button type="text" icon={<IconThumbDown />} iconOnly title="Not helpful" className={feedback === 'down' ? 'selected' : ''} aria-label="Not helpful" aria-pressed={feedback === 'down'} onClick={() => setFeedback(feedback === 'down' ? null : 'down')} />
        </span>}
      </div>
    </section>
  );
}

function SearchPanel({ open, query = '', submittedQuery = '', history = [], aiEnabled, onAiChange, searchRun, voiceStatus, onClose, onNavigate, onSelectQuery, onClearHistory }) {
  const [currentPage, setCurrentPage] = useState(1);
  const panelRef = useRef(null);
  const resultHeadingRef = useRef(null);
  const normalizedQuery = query.trim();
  const isResultView = Boolean(submittedQuery && submittedQuery === normalizedQuery);
  const liveResults = useMemo(() => searchPages(normalizedQuery), [normalizedQuery]);
  const productFeature = useMemo(() => searchProductFeature(submittedQuery), [submittedQuery]);
  const results = useMemo(() => {
    const matchedPages = searchPages(submittedQuery);
    if (!productFeature) return matchedPages;
    const relatedPages = productFeature.relatedPaths.map((path) => SITE_PAGES.find((page) => page.href === path)).filter(Boolean);
    const seen = new Set([canonicalSearchHref({ href: productFeature.href })]);
    return [...relatedPages, ...matchedPages].filter((page) => {
      const path = canonicalSearchHref(page);
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    });
  }, [submittedQuery, productFeature]);
  const overview = useMemo(() => buildAiOverview(submittedQuery, results), [submittedQuery, results]);

  useEffect(() => {
    setCurrentPage(1);
    panelRef.current?.scrollTo({ top: 0 });
  }, [open, submittedQuery, searchRun]);

  const changePage = (page) => {
    setCurrentPage(page);
    requestAnimationFrame(() => {
      resultHeadingRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      resultHeadingRef.current?.focus({ preventScroll: true });
    });
  };
  const navigate = () => { onClose(); onNavigate?.(); };
  const pageResults = results.slice((currentPage - 1) * SEARCH_PAGE_SIZE, currentPage * SEARCH_PAGE_SIZE);

  if (!open) return null;

  return (
    <div className="search-layer" id="pldt-search-surface">
      <div className="search-backdrop" aria-hidden="true" onClick={onClose} />
      <section ref={panelRef} className={`search-panel ${isResultView ? 'search-panel--results' : ''}`} aria-label="PLDT Home search">
        <div className={`search-toolbar ${isResultView ? 'search-toolbar--results' : ''}`}>
          {isResultView ? <div className="search-panel__head"><h2>Results for “{submittedQuery}”</h2></div> : <span className="search-toolbar__label">SEARCH PLDT HOME</span>}
          {!(isResultView && productFeature) && <Checkbox className="search-ai-option" checked={aiEnabled} onChange={onAiChange}>Include AI summary</Checkbox>}
        </div>
        {voiceStatus && <div className="search-voice-status" role="status">{voiceStatus}</div>}

        {!isResultView ? (
          <div className="search-discovery" aria-live="polite">
            {normalizedQuery ? (
              <div className="search-suggestions">
                <div className="search-section-label">Suggested pages</div>
                {liveResults.length ? liveResults.slice(0, 6).map((result) => (
                  <SearchResultLink result={result} query={normalizedQuery} key={result.href} onNavigate={() => { onClose(); onNavigate?.(); }} />
                )) : <Empty description="No matching pages yet" />}
              </div>
            ) : (
              <>
                {history.length > 0 && (
                  <div className="search-chip-section">
                    <div className="search-section-label">
                      <span>History</span>
                      <Button type="text" icon={<IconDelete />} iconOnly title="Clear history" aria-label="Clear history" onClick={onClearHistory} />
                    </div>
                    <div className="search-chips">
                      {history.map((item) => <button type="button" className="search-chip" key={item} onClick={() => onSelectQuery(item)}>{item}</button>)}
                    </div>
                  </div>
                )}
                <div className="search-chip-section">
                  <div className="search-section-label"><span>Suggested searches</span></div>
                  <div className="search-chips">
                    {SEARCH_DISCOVERY.map((item) => <button type="button" className="search-chip" key={item.query} onClick={() => onSelectQuery(item.query)}>{item.label}</button>)}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="search-results-layout">
            {productFeature && <SearchProductFeature key={productFeature.key} feature={productFeature} LinkComponent={LocalLink} onNavigate={navigate} />}
            {!productFeature && aiEnabled && results.length > 0 && <StreamingSummary key={`${submittedQuery}-${searchRun}`} overview={overview} onNavigate={navigate} />}
            <div className="search-result-column">
              <div ref={resultHeadingRef} tabIndex={-1} className="search-column-heading">
                <span>Search results</span>
                <small>{results.length} {results.length === 1 ? 'result' : 'results'}</small>
              </div>
              {results.length ? pageResults.map((result) => (
                <SearchResultLink result={result} query={submittedQuery} key={result.href} onNavigate={navigate} />
              )) : <Empty description="No matching pages found" />}
              {results.length > 0 && <nav className="search-pagination" aria-label="Search result pages"><Pagination current={currentPage} total={results.length} pageSize={SEARCH_PAGE_SIZE} size="small" onChange={changePage} /></nav>}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function MegaMenu({ section, onNavigate }) {
  return (
    <div className={`mega-menu mega-menu--${section.key}`} aria-label={`${section.title} pages`}>
      <div className="mega-menu__inner">
        {section.groups.map((group) => (
          <section className="mega-group" key={group.title}>
            <div className="mega-group__heading">
              <img src={`${A}${group.icon}`} alt="" />
              <span>
                {group.href
                  ? <LocalLink href={group.href} onNavigate={onNavigate}><strong>{group.title}</strong></LocalLink>
                  : <strong>{group.title}</strong>}
                <small>{group.subtitle}</small>
              </span>
            </div>
            <div className="mega-group__links">
              {group.items.map((item) => (
                <React.Fragment key={item.href}>
                  {item.label && <span className="mega-group__label">{item.label}</span>}
                  <LocalLink href={item.href} onNavigate={onNavigate}>
                    <strong>{item.title}</strong>
                    {item.description && <small>{item.description}</small>}
                  </LocalLink>
                </React.Fragment>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function useVoiceSearch(active, onTranscript) {
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(onTranscript);
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState('');
  transcriptRef.current = onTranscript;

  useEffect(() => {
    if (!active) {
      recognitionRef.current?.abort();
      setListening(false);
      setStatus('');
    }
    return () => {
      const recognition = recognitionRef.current;
      if (recognition) {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.abort();
        recognitionRef.current = null;
      }
    };
  }, [active]);

  const toggle = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      setStatus('Voice input stopped. You can edit your search.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('Voice input is unavailable in this browser. Try Chrome or Edge.');
      return;
    }
    recognitionRef.current?.abort();
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-PH';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join(' ');
      transcriptRef.current(transcript);
      if (event.results[event.results.length - 1].isFinal) setStatus('Voice captured. Press Enter to search.');
    };
    recognition.onerror = (event) => {
      setListening(false);
      const messages = {
        'not-allowed': 'Microphone access is blocked. Allow it in your browser to use voice input.',
        'service-not-allowed': 'Voice input is unavailable in this browser. Try Chrome or Edge.',
        'audio-capture': 'No microphone found. Check your microphone and try again.',
        'no-speech': 'No speech detected. Tap the microphone to try again.',
        network: 'Voice input could not connect. Check your connection and try again.',
      };
      if (event.error !== 'aborted') setStatus(messages[event.error] || 'Voice input could not start. Please try again.');
    };
    recognition.onend = () => {
      setListening(false);
      setStatus((current) => current === 'Listening… Speak now.' ? 'No speech detected. Tap the microphone to try again.' : current);
    };
    try {
      recognition.start();
      setListening(true);
      setStatus('Listening… Speak now.');
    } catch {
      setListening(false);
      setStatus('Voice input could not start. Please try again.');
    }
  };

  return { listening, status, toggle, stop: () => recognitionRef.current?.stop(), clearStatus: () => setStatus('') };
}

function Header({
  currentPath,
  menuOpen,
  setMenuOpen,
  searchOpen,
  query,
  onOpenSearch,
  onCloseSearch,
  onChangeQuery,
  onSubmitSearch,
  voice,
  onNavigate,
}) {
  const [mobileSection, setMobileSection] = useState(null);

  useEffect(() => {
    if (!menuOpen) setMobileSection(null);
  }, [menuOpen]);

  const navigate = () => {
    setMenuOpen(false);
    onCloseSearch(false);
    onNavigate?.();
  };

  return (
    <>
      <header className={`site-header ${searchOpen ? 'search-is-open' : ''}`}>
        <button className="mobile-icon mobile-menu" inert={searchOpen ? true : undefined} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => { setMenuOpen(!menuOpen); onCloseSearch(false); }}>
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
        <LocalLink className="brand" href="/" inert={searchOpen ? true : undefined} aria-label="PLDT Home" onNavigate={navigate}>
          <img src={`${A}pldt-logo.png`} alt="PLDT Home" />
        </LocalLink>
        <nav className="desktop-nav" inert={searchOpen ? true : undefined} aria-label="Primary navigation">
          {NAV_SECTIONS.map((section) => (
            <div className={`nav-entry ${section.groups ? 'has-mega-menu' : ''}`} key={section.key}>
              <LocalLink className={`nav-item ${section.groups ? 'has-menu' : ''}`} href={section.href} onNavigate={navigate} aria-current={currentPath === section.href ? 'page' : undefined}>
                <strong>{section.title}</strong><span>{section.subtitle}</span>
              </LocalLink>
              {section.groups && <MegaMenu section={section} onNavigate={navigate} />}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <div className={`header-search ${searchOpen ? 'open' : ''}`}>
            <form className="header-search__form" role="search" aria-label="Search PLDT Home" onSubmit={onSubmitSearch}>
              <Input
                aria-label="Search PLDT Home"
                prefix={<IconSearch />}
                placeholder="Search plans, promos, support and more"
                value={query}
                onChange={onChangeQuery}
              />
              <Button className={`header-search__voice ${voice.listening ? 'is-listening' : ''}`} aria-label={voice.listening ? 'Stop voice input' : 'Voice input'} aria-pressed={voice.listening} title={voice.listening ? 'Stop voice input' : 'Voice input'} type="text" icon={<IconVoice />} iconOnly onClick={voice.toggle} />
              <Button className="header-search__close" aria-label="Close search" title="Close search" type="text" icon={<IconClose />} iconOnly onClick={() => onCloseSearch(true)} />
              <Button className="header-search__submit" aria-label="Submit search" htmlType="submit" type="primary" icon={<IconSearch />} iconOnly />
            </form>
            <Button
              className="search-trigger"
              aria-label="Search PLDT Home"
              title="Search PLDT Home"
              aria-expanded={searchOpen}
              aria-controls="pldt-search-surface"
              type="text"
              icon={<IconSearch />}
              iconOnly
              onClick={() => { onOpenSearch(); setMenuOpen(false); }}
            />
          </div>
          <LocalLink className="rewards" href="/rewards" inert={searchOpen ? true : undefined} onNavigate={navigate}><img src={`${A}nav-rewards.png`} alt="" /><span><strong>REWARDS</strong><small>Loyalty Program</small></span></LocalLink>
          <a className="account" href="https://my.pldthome.com/" inert={searchOpen ? true : undefined}><img src={`${A}nav-account.png`} alt="" /><span>ACCOUNT LOGIN</span></a>
          <a className="mobile-account" href="https://my.pldthome.com/" inert={searchOpen ? true : undefined} aria-label="Account login"><IconUser /></a>
        </div>
      </header>
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} inert={!menuOpen || searchOpen ? true : undefined} aria-hidden={!menuOpen || searchOpen} aria-label="Mobile navigation">
        {NAV_SECTIONS.map((section) => section.groups ? (
          <section className="mobile-nav-section" key={section.key}>
            <div className="mobile-nav-row">
              <LocalLink href={section.href} onNavigate={navigate} aria-current={currentPath === section.href ? 'page' : undefined}>
                <strong>{section.title}</strong><span>{section.subtitle}</span>
              </LocalLink>
              <button
                type="button"
                aria-label={`${mobileSection === section.key ? 'Collapse' : 'Expand'} ${section.title} menu`}
                aria-expanded={mobileSection === section.key}
                aria-controls={`mobile-${section.key}-submenu`}
                onClick={() => setMobileSection(mobileSection === section.key ? null : section.key)}
              >
                <IconDown />
              </button>
            </div>
            <div id={`mobile-${section.key}-submenu`} className={`mobile-nav-submenu ${mobileSection === section.key ? 'open' : ''}`}>
              {section.groups.map((group) => (
                <div className="mobile-nav-group" key={group.title}>
                  {group.href
                    ? <LocalLink className="mobile-nav-group__title" href={group.href} onNavigate={navigate}>{group.title}</LocalLink>
                    : <span className="mobile-nav-group__title">{group.title}</span>}
                  {group.items.map((item) => <LocalLink href={item.href} key={item.href} onNavigate={navigate}>{item.title}</LocalLink>)}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <LocalLink href={section.href} key={section.key} onNavigate={navigate} aria-current={currentPath === section.href ? 'page' : undefined}>
            <strong>{section.title}</strong><span>{section.subtitle}</span>
          </LocalLink>
        ))}
        <LocalLink className="mobile-rewards" href="/rewards" onNavigate={navigate}><img src={`${A}nav-rewards.png`} alt="" /><span><strong>REWARDS</strong><small>Loyalty Program</small></span></LocalLink>
      </nav>
    </>
  );
}

function CookieNotice({ onAccept }) {
  return (
    <section className="cookie-band" aria-label="Cookie notice">
      <div className="cookie-card">
        <div>
          <p>PLDT, Inc. uses cookies to give you the best experience on our website. By continuing to view our site, you consent to our use of cookies. You can learn more about our cookie policy <LocalLink href="/cookie-policy">here</LocalLink>.</p>
          <Button className="cookie-accept" type="primary" onClick={onAccept}>I ACCEPT</Button>
        </div>
        <LocalLink className="cookie-link" href="/cookie-policy">ⓘ Read our Cookie Policy</LocalLink>
      </div>
    </section>
  );
}

function ServiceBar({ pathname }) {
  if (pathname === '/fiberprepaid' || pathname.startsWith('/security/')) return null;
  const links = pathname === '/fiber' ? fiberServiceLinks : serviceLinks;
  return (
    <nav className={`service-bar ${pathname === '/fiber' ? 'service-bar--fiber' : ''}`} aria-label="Quick service links">
      {links.map((item) => <LocalLink href={item.href} key={item.label}>{item.icon}<span>{item.label}</span></LocalLink>)}
    </nav>
  );
}

function HeroSlide({ slide }) {
  return (
    <article className={`hero-slide hero-slide--${slide.tone}`}>
      <picture className="hero-bg">
        <source media="(min-width: 1200px)" srcSet={`${A}${slide.desktop}`} />
        <img src={`${A}${slide.mobile}`} alt="" />
      </picture>
      <div className="hero-copy">
        {slide.logo && <img className={`slide-logo ${slide.logoClass}`} src={`${A}${slide.logo}`} alt="" />}
        {slide.headlineImage && <img className="headline-image" src={`${A}${slide.headlineImage}`} alt="Sumakses ka sa unli!" />}
        {slide.title && <h1>{slide.title}</h1>}
        {slide.description && <p>{slide.description}</p>}
        <LocalLink className="hero-cta" href={slide.href}>{slide.cta}</LocalLink>
        {slide.note && <small className="hero-note">{slide.note}</small>}
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Featured offers">
      <Carousel autoPlay={{ interval: 5500, hoverToPause: true }} showArrow="always" indicatorType="dot" animation="slide" moveSpeed={500}>
        {slides.map((slide) => (
          <div className="hero-item" key={slide.desktop}>
            <HeroSlide slide={slide} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="quick-links" aria-label="Explore PLDT Home">
      {quickLinks.map((item) => (
        <LocalLink href={item.href} className="quick-link" key={item.title}>
          <img src={`${A}${item.image}`} alt="" />
          <span><strong>{item.title}</strong><small>{item.text}</small></span>
        </LocalLink>
      ))}
    </section>
  );
}

const detailThemes = {
  internet: {
    desktop: 'hero-fiber-sale-desktop.png', mobile: 'hero-fiber-sale-mobile.png',
    eyebrow: 'PLDT HOME FIBER', cta: 'CHECK AVAILABLE PLANS',
    features: ['Fiber-fast connectivity', 'Plans for every household', 'Reliable support when you need it'],
  },
  addons: {
    desktop: 'hero-streamtv-desktop.png', mobile: 'hero-streamtv-mobile.png',
    eyebrow: 'PLDT HOME ADD-ONS', cta: 'EXPLORE ADD-ONS',
    features: ['More ways to stay connected', 'Entertainment for every screen', 'Smarter devices for your home'],
  },
  entertainment: {
    desktop: 'hero-streamtv-desktop.png', mobile: 'hero-streamtv-mobile.png',
    eyebrow: 'ENTERTAINMENT', cta: 'VIEW ENTERTAINMENT OPTIONS',
    features: ['Movies and series on demand', 'Live TV and premium channels', 'Seamless streaming on PLDT Fiber'],
  },
  smarthome: {
    desktop: 'hero-mwell-desktop.png', mobile: 'hero-mwell-mobile.png',
    eyebrow: 'SMART HOME', cta: 'BUILD YOUR SMART HOME',
    features: ['Monitor your home anywhere', 'Simple connected controls', 'Extra security and peace of mind'],
  },
  health: {
    desktop: 'hero-mwell-desktop.png', mobile: 'hero-mwell-mobile.png',
    eyebrow: 'HEALTH & WELLNESS', cta: 'LEARN MORE',
    features: ['Family wellness dashboard', 'Convenient teleconsult access', 'Support for physical and mental wellness'],
  },
  promos: {
    desktop: 'hero-fiber-upgrade-desktop.png', mobile: 'hero-fiber-upgrade-mobile.png',
    eyebrow: 'PLDT HOME PROMOS', cta: 'SEE THE LATEST DEALS',
    features: ['Exclusive plan offers', 'Valuable service bundles', 'More ways to save'],
  },
  support: {
    desktop: 'tile-support.png', mobile: 'tile-support.png',
    eyebrow: 'PLDT HOME SUPPORT', cta: 'GET SUPPORT',
    features: ['Step-by-step troubleshooting', 'Track service requests', 'Find the right support channel'],
  },
  rewards: {
    desktop: 'hero-fiber-upgrade-desktop.png', mobile: 'hero-fiber-upgrade-mobile.png',
    eyebrow: 'PLDT HOME REWARDS', cta: 'EXPLORE REWARDS',
    features: ['Exclusive customer privileges', 'Special partner offers', 'More value from your PLDT plan'],
  },
  company: {
    desktop: 'tile-company.png', mobile: 'tile-company.png',
    eyebrow: 'INSIDE PLDT', cta: 'LEARN MORE',
    features: ['Serving Filipino homes', 'Building reliable connections', 'Committed to responsible innovation'],
  },
};

const planCards = [
  { name: 'Fiber Unli All', speed: '100 Mbps', price: '₱1,499/mo', detail: 'Internet, landline, Cignal TV and HBO Max', href: '/fiber-unli-all' },
  { name: 'Fiber Netflix', speed: '300 Mbps', price: '₱1,599/mo', detail: 'Unlimited internet with Netflix included', href: '/fiber-netflix' },
  { name: 'Fiber Unli', speed: '100 Mbps', price: '₱1,299/mo', detail: 'Unlimited fiber internet and landline', href: '/fiber' },
];

const fiberUnliPlans = [
  {
    name: 'Fiber Unli 1299', speed: '100 Mbps', href: 'https://pldthomefiber-unli1299.zite.so/',
    perks: [{ type: 'install', lead: 'Free', label: 'Installation & Activation' }],
  },
  {
    name: 'Fiber Unli 1699', speed: '300 Mbps', badge: 'MOST POPULAR', href: 'https://pldthomefiber-unli1699.zite.so/',
    perks: [{ type: 'igv', lead: 'Free 1 year', label: 'IGV Game Pass' }, { type: 'install', lead: 'Free', label: 'Installation & Activation' }],
  },
  {
    name: 'Fiber Unli 2099', speed: '500 Mbps', href: 'https://pldthomefiber-unli2099.zite.so/',
    perks: [{ type: 'igv', lead: 'Free 1 year', label: 'IGV Game Pass' }, { type: 'install', lead: 'Free', label: 'Installation & Activation' }],
  },
];

const prepaidTiers = {
  '50 Mbps': [
    ['₱50', '1 DAY'], ['₱199', '7 DAYS'], ['₱379', '15 DAYS', 'NEW!'], ['₱699', '30 DAYS', 'BEST VALUE AT ₱23.3/DAY'], ['₱6,999', '365 DAYS'],
  ],
  '100 Mbps': [
    ['₱99', '1 DAY'], ['₱379', '7 DAYS'], ['₱549', '15 DAYS'], ['₱999', '30 DAYS', 'BEST VALUE AT ₱33.3/DAY'], ['₱9,999', '365 DAYS'],
  ],
  '300 Mbps': [
    ['₱199', '1 DAY'], ['₱699', '7 DAYS'], ['₱999', '15 DAYS'], ['₱1,499', '30 DAYS', 'BEST VALUE AT ₱49.97/DAY'], ['₱14,999', '365 DAYS'],
  ],
};

const loadingChannels = [
  ['prepaid-load-pldt.png', 'PLDT Home'], ['prepaid-load-maya.png', 'Maya'], ['prepaid-load-gcash.png', 'GCash'],
  ['prepaid-load-sm.png', 'SM'], ['prepaid-load-sarisari.png', 'Sari-sari Store'], ['prepaid-load-paygo.png', 'Pay & Go'], ['prepaid-load-ecpay.png', 'ECpay'],
];

const cameraProducts = [
  {
    name: 'Tapo Indoor Camera C110', tagline: 'Indoor safety and security 24/7 while you’re away from home.', image: 'cameras-product-tapo.png',
    price: '₱89/mo*', term: 'Locked in 24 mos.', cash: '₱1,099/pc', cta: 'GET IT NOW', href: 'https://www.pldthome.com/security/cameras/tapo-indoor-camera-application',
    features: [
      ['2K clear and crisp videos are captured', 'View clear & crisp live or recorded footages via the app. Video capture is optimized both for day and night settings.'],
      ['Built-In AI', 'Know who’s in your home with human and motion detection, automatic tracking, and crying detection alerts.'],
      ['Two-way Audio', 'Communicate in real-time through the built-in mic and speaker.'],
    ],
  },
  {
    name: 'eufy Outdoor Cam 2C Pro', tagline: 'Outdoor safety and security for your home perimeter 24/7', image: 'cameras-product-outdoor.png',
    price: '₱789/mo*', term: 'Locked in 36 mos.', cash: '₱20,995/set', cta: 'GET IT NOW', href: 'https://www.pldthome.com/security/cameras/eufy-outdoor-camera-application',
    features: [
      ['2K Crystal Clear Videos', 'View clear & crisp live or recorded footages via the app, optimized for day and night settings.'],
      ['IP67 Rated Weatherproof Cameras', 'Install the two cameras anywhere within your perimeter with resistance to dust and water.'],
      ['Wireless with up to 180 Days Battery Life', 'No LAN or power cable is needed, and one full charge can last for up to six months.'],
      ['LED Spotlight', 'Get a detailed night view and a visible deterrent for intruders.'],
    ],
  },
  {
    name: 'eufy Indoor Camera C220', tagline: 'Indoor safety and security 24/7 while you’re away from home.', image: 'cameras-product-indoor.png',
    price: '₱119/mo*', term: 'Locked in 36 mos.', cash: '₱2,299/pc', cta: 'GET IT NOW', href: 'https://www.pldthome.com/security/cameras/eufy-indoor-camera-application',
    features: [
      ['2K Crystal Clear Videos', 'View clear & crisp live or recorded footages via the app, optimized for day and night settings.'],
      ['Built-In AI', 'Human and motion detection automatically tracks movement and sends crying detection alerts.'],
      ['360° Pan & Tilt Surveillance', 'Completely monitor your home without blind spots.'],
    ],
  },
];

const securityFeatures = {
  cameras: [
    ['cameras-feature-2k.png', '2K Crystal Clear Videos'],
    ['cameras-feature-ai.png', 'Built-in AI for Human and Motion Detection'],
    ['cameras-feature-audio.png', 'Two-way Audio'],
    ['cameras-feature-mobile.png', 'Instant Mobile Alerts & Notification'],
  ],
  doorlock: [
    ['doorlock-feature-unlock.png', 'Multiple ways to unlock your door'],
    ['doorlock-feature-control.png', 'Control from anywhere'],
    ['doorlock-feature-autolock.png', 'Auto-lock feature'],
    ['doorlock-feature-wireless.png', 'Wireless and weatherproof'],
  ],
};

const doorLockProduct = {
  name: 'eufy Smart Door Lock', tagline: 'Front door security and control 24/7 and from anywhere', image: 'doorlock-product.png',
  price: '₱649/mo*', term: 'Locked in 24 mos.', cash: '₱13,299/pc', cta: 'OUT OF STOCK', href: 'https://www.pldthome.com/security/door-lock/eufy-smart-door-lock-application',
  features: [
    ['Multiple ways to unlock your door', 'Door access can be either through biometrics, mobile app, keypad, or traditional key.'],
    ['Control from anywhere', 'With the wi-fi connectivity and security app, the smart doorlock can be controlled by an authorized user remotely.'],
    ['Autolock feature', 'A built-in sensor detects when the door is closed and locks automatically behind the user.'],
    ['Wireless and weatherproof', 'No LAN and power cable needed. One full charge can last for up to one year, while IP65 certification ensures dust and water resistance.'],
  ],
};

const cameraFaqs = [
  ['How can I purchase a Home Security Device?', 'You can purchase a eufy or a Tapo security device through the PLDT Home website, PLDT and Smart Stores, and Telesales.'],
  ['When will I receive my Home Security Device?', 'Devices can be delivered within 2–3 days within Metro Manila and 5–7 days outside Metro Manila after your order is confirmed.'],
  ['How many Home Security Devices can I purchase?', 'Eligible PLDT Home subscribers may purchase multiple units, subject to account validation and available stocks.'],
  ['Does my Home Security Device come with a warranty?', 'Yes. Home Security Devices include a limited manufacturer warranty, subject to the device warranty terms.'],
  ['How long does it take to replace a device covered by warranty?', 'Replacement timing depends on validation, device availability, and the manufacturer’s service process.'],
];

const doorLockFaqs = [
  ['How can I avail the new device offers?', 'Existing PLDT subscribers can visit a PLDT Store, the PLDT Home website, or call 171 to avail of the device offers. Subscribers can choose from payment options charged to their PLDT bill: 36 months, 24 months, 12 months, or one-time payment. Devices can be delivered within 2–3 days within Metro Manila and 5–7 days outside Metro Manila from confirmation of order.\n\nFor subscribers who opt for delivery, a fee of ₱150 will be charged per transaction to the subscriber’s next bill.'],
  ['How do I install and operate these devices?', 'Follow the included setup guide and connect the device to the eufy Security app. Additional setup support is available through PLDT Home.'],
  ['How long is the warranty period and who do I contact for after-sales servicing?', 'The device includes a limited manufacturer warranty. Contact PLDT Home or the authorized device service channel for after-sales support.'],
  ['What is the SLA in case that my device under warranty is for replacement?', 'Replacement timing starts after the device has been assessed and approved for warranty replacement, subject to stock availability.'],
  ['Up to how many Home Security Device units can I avail?', 'The number of units available depends on account eligibility, credit validation, and current stock.'],
  ['Can I view live/ recorded videos from multiple cameras at the same time?', 'Compatible eufy devices can be viewed and managed in the eufy Security app.'],
  ['Can these devices still work even with power interruption?', 'Battery-powered devices can continue operating while their batteries have sufficient charge; network-dependent features require an active connection.'],
  ['What microSD card can I use for storage for the eufy Indoor Camera 2K?', 'Use a compatible high-endurance microSD card within the capacity supported by the device.'],
  ['Up to to how many days of recording can the microSD card support?', 'Recording duration depends on card capacity, resolution, motion frequency, and recording settings.'],
  ['Do I have to connect my eufy Outdoor Camera to a power source?', 'No. The outdoor camera is wireless and runs on a rechargeable battery.'],
  ['How do I charge the battery of the eufy Outdoor Camera?', 'Remove or access the camera as directed in its setup guide and charge it with the supplied charging cable.'],
  ['How long does the eufy Outdoor Camera’s battery last on one charge?', 'A full charge can last for up to 180 days depending on activity, settings, and environmental conditions.'],
];

function LiveFaq({ items }) {
  return (
    <section className="live-faq" id="faqs">
      <h2>Frequently Asked Questions</h2>
      <div className="live-faq__list">
        {items.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FiberPlansPage() {
  return (
    <main className="live-page fiber-live-page">
      <section className="fiber-live-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${A}fiber-plans-hero-mobile.png`} />
          <img src={`${A}fiber-plans-hero.png`} alt="Woman enjoying fast PLDT Home Fiber" />
        </picture>
        <div className="fiber-live-hero__copy">
          <img src={`${A}fiber-plans-logo.png`} alt="PLDT Home Fiber Unli" />
          <h1>Always work-ready with fast and reliable connectivity!</h1>
        </div>
      </section>

      <section className="fiber-live-plans" id="plans">
        <div className="fiber-live-plan-grid">
          {fiberUnliPlans.map((plan) => (
            <article className="fiber-live-card" key={plan.name}>
              {plan.badge && <span className="fiber-live-card__badge">★ {plan.badge}</span>}
              <h2>{plan.name}</h2>
              <small>Up to</small>
              <strong>{plan.speed}</strong>
              <div className="fiber-live-card__divider"><span>Inclusions</span></div>
              <ul>
                {plan.perks.map((perk) => <li key={perk}><IconWifi /> <span>{perk}</span></li>)}
              </ul>
              <div className="fiber-live-card__price">{plan.price}</div>
              <LocalLink className="live-red-button" href="/contact">SELECT AND CONTINUE</LocalLink>
            </article>
          ))}
        </div>
        <button className="fiber-ready-note" type="button">Prepare your in-house wiring and have a valid ID with your signature ready before applying.</button>
      </section>

      <section className="fiber-promo-band">
        <img src={`${A}fiber-exclusive-promo.png`} alt="Exclusive PLDT Home Fiber promo" />
        <div><span>EXCLUSIVE PROMOS JUST FOR YOU</span><h2>Enjoy these perks and rewards when you subscribe today!</h2><LocalLink className="live-red-button" href="/whatsnew">LEARN MORE</LocalLink></div>
      </section>

      <LiveFaq items={[
        ['What is Fiber?', 'PLDT Home Fiber uses Fiber-to-the-Home technology for fast and reliable connectivity with strong upload and download performance.'],
        ['How does the Unli Calls feature work?', 'Eligible Fiber Unli plans include unlimited calls to PLDT landline numbers and selected mobile calling benefits.'],
        ['What is the difference between Fiber and DSL?', 'Fiber carries data through fiber-optic lines, enabling faster and more consistent performance than copper-based DSL.'],
        ['What is the contract period?', 'Standard contract periods and final eligibility depend on the selected plan and current offer.'],
      ]} />

      <section className="fiber-recommender">
        <img className="fiber-recommender__person" src={`${A}fiber-recommender-person.png`} alt="PLDT Home plan adviser" />
        <div><h2>Did you find what you’re looking for?</h2><p>Let us help you choose the plan that best suits your needs.</p><LocalLink className="live-red-button" href="/plan-recommender">RECOMMEND THE BEST PLAN FOR ME</LocalLink></div>
      </section>
    </main>
  );
}

function PrepaidPage() {
  const [tier, setTier] = useState('50 Mbps');

  return (
    <main className="live-page prepaid-live-page">
      <nav className="prepaid-subnav" aria-label="Fiber Prepaid page navigation">
        <a href="#prepaid-plans">LOAD HERE</a><a href="#how-to-load">HOW TO LOAD</a>
      </nav>
      <section className="prepaid-live-hero">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${A}prepaid-page-hero-mobile.png`} />
          <img src={`${A}prepaid-page-hero.png`} alt="Family enjoying PLDT Home Fiber Prepaid" />
        </picture>
        <div className="prepaid-live-hero__copy">
          <img className="prepaid-live-logo" src={`${A}prepaid-logo-wide.png`} alt="PLDT Home Fiber Prepaid" />
          <img className="prepaid-live-headline" src={`${A}prepaid-headline.png`} alt="Mag PLDT Prepaid na" />
          <LocalLink className="live-red-button" href="/contact">APPLY NOW</LocalLink>
          <p>Already a Fiber Prepaid subscriber? <a href="#prepaid-plans">Load here!</a></p>
        </div>
      </section>

      <section className="prepaid-benefits">
        <picture><source media="(max-width: 768px)" srcSet={`${A}prepaid-benefits-mobile.png`} /><img src={`${A}prepaid-benefits-desktop.png`} alt="PLDT Home Fiber Prepaid modem" /></picture>
        <div className="prepaid-benefits__copy">
          <h1>Stay connected with PLDT Home Fiber Prepaid</h1>
          <div className="prepaid-benefit-pills"><span>Abot-kaya</span><span>Mag-load ng kailangan</span><span>No monthly bill</span><span>No contract</span></div>
          <strong>Up to <b>50 Mbps</b></strong>
          <div className="prepaid-price"><span>ONLY</span> ₱999</div>
          <p>Pay the one-time fee and enjoy <b>30 days of unlimited fiber for FREE.</b></p>
          <LocalLink className="live-red-button" href="/contact">APPLY NOW</LocalLink>
        </div>
      </section>

      <section className="prepaid-loads" id="prepaid-plans">
        <h2>Sumakses sa mas mabilis na Unli Fiber Prepaid!</h2>
        <p>Now with speeds of up to 100 and 300 Mbps and one-year subscription options.</p>
        <div className="prepaid-tier-tabs" role="tablist" aria-label="Fiber Prepaid speeds">
          {Object.keys(prepaidTiers).map((name) => <button type="button" role="tab" aria-selected={tier === name} className={tier === name ? 'active' : ''} onClick={() => setTier(name)} key={name}>{name}</button>)}
        </div>
        <div className="prepaid-load-grid">
          {prepaidTiers[tier].map(([price, duration, badge]) => (
            <article className="prepaid-load-card" key={`${tier}-${duration}`}>
              {badge && <span>{badge}</span>}<strong>{price}</strong><small>FOR {duration}</small>
            </article>
          ))}
        </div>
        <p>Log in to PLDT Home to avail these load options.</p>
        <LocalLink className="live-red-button" href="/contact">LOAD HERE</LocalLink>
      </section>

      <section className="prepaid-channels">
        <h2>Now more accessible loading channels</h2>
        <div>{loadingChannels.map(([image, name]) => <figure key={name}><img src={`${A}${image}`} alt={name} /><figcaption>{name}</figcaption></figure>)}</div>
      </section>

      <section className="prepaid-how" id="how-to-load">
        <h2>How to avail of Fiber Prepaid Data Packages</h2>
        {[
          ['Top Up Via GCash', 'Open GCash, choose Load, select Broadband, then choose PLDT Home Fiber Prepaid.'],
          ['Top Up Via Maya', 'Open Maya, choose Shop, select Broadband and follow the PLDT Home Fiber Prepaid steps.'],
          ['Top Up Via Website and Continue As Guest', 'Enter your account number, select a load package and continue with your preferred payment method.'],
          ['Create New MyHome Account', 'Register a PLDT myHome account, link your Fiber Prepaid account and choose your load.'],
        ].map(([title, copy], index) => <details key={title} open={index === 0}><summary>{title}</summary><p><b>Step 1.</b> {copy}</p></details>)}
      </section>

      <LiveFaq items={[
        ['What is a Fiber Prepaid service?', 'Fiber Prepaid is PLDT Home’s pay-per-use unlimited internet service that is reloadable, with offers starting at ₱50 for one day.'],
        ['Is Fiber Prepaid available nationwide?', 'Availability depends on Fiber facilities at your address. Apply or contact PLDT Home to check your area.'],
        ['Where can I track my prepaid load and usage?', 'Log in to PLDT Home using your linked account number to view active load and account information.'],
      ]} />
    </main>
  );
}

function SecurityProductPage({ type }) {
  const isCamera = type === 'cameras';
  const [featureIndex, setFeatureIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const product = isCamera ? cameraProducts[productIndex] : {
    name: 'eufy Smart Door Lock', tagline: 'Front door security and control 24/7 and from anywhere.', image: 'doorlock-product.png',
    price: '₱649/mo*', term: 'for 24 months', cash: 'or ₱13,299/pc', cta: 'OUT OF STOCK',
    features: ['Biometrics, app, keypad and key access', 'Control from anywhere', 'Automatic locking', 'Wireless, IP65 and one-year battery life'],
  };
  const features = securityFeatures[type];
  const title = isCamera ? 'Smart, affordable security built for your lifestyle' : 'Safer as you brave the world';
  const intro = isCamera ? 'You and your family can keep your home safe and have peace of mind' : 'Safeguard your home and loved ones with advanced locking technology';

  return (
    <main className="live-page security-live-page">
      <section className="security-live-hero">
        <picture><source media="(max-width: 768px)" srcSet={`${A}${isCamera ? 'cameras-hero-mobile.png' : 'doorlock-hero-mobile.png'}`} /><img src={`${A}${isCamera ? 'cameras-hero-desktop.png' : 'doorlock-hero-desktop.png'}`} alt="" /></picture>
        <div><h1>{title}</h1><p>Keep watch over the things that matter most</p><a className="live-red-button" href="#security-products">APPLY NOW</a></div>
      </section>

      <section className="security-features">
        <div className="security-features__copy">
          <h2>{intro}</h2>
          <div className="security-feature-tabs">
            {features.map(([image, label], index) => <button type="button" className={featureIndex === index ? 'active' : ''} onClick={() => setFeatureIndex(index)} key={label}><img src={`${A}${image}`} alt="" /><span>{label}</span></button>)}
          </div>
        </div>
        <img className="security-feature-visual" src={`${A}${features[featureIndex][0]}`} alt={features[featureIndex][1]} />
      </section>

      <section className="security-products" id="security-products">
        <h2>Choose the best security partner for your home</h2>
        {isCamera && <div className="security-product-tabs">{cameraProducts.map((item, index) => <button type="button" className={productIndex === index ? 'active' : ''} onClick={() => setProductIndex(index)} key={item.name}>{item.name}</button>)}</div>}
        <article className="security-product-card">
          <div className="security-product-card__image"><img src={`${A}${product.image}`} alt={product.name} /></div>
          <div className="security-product-card__copy">
            <h3>{product.name}</h3><p>{product.tagline}</p><strong>{product.price}</strong><small>{product.term}<br />{product.cash}</small>
            <ul>{product.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
            <LocalLink className={`live-red-button ${product.cta === 'OUT OF STOCK' ? 'disabled' : ''}`} href={product.cta === 'OUT OF STOCK' ? '/security/door-lock' : '/contact'}>{product.cta}</LocalLink>
            {!isCamera && <em>New Smart Door Locks Coming Soon.</em>}
            <small>*Available to PLDT Home subscribers. Delivery fee is ₱150.</small>
          </div>
        </article>
      </section>

      <LiveFaq items={isCamera ? [
        ['Where can I purchase PLDT Home Cameras?', 'Choose your preferred camera above, then submit an order through PLDT Home.'],
        ['How long will delivery take?', 'Delivery timing depends on your address and current product availability.'],
        ['How many cameras can I order?', 'Eligible subscribers can order multiple units subject to account and stock availability.'],
        ['Are the cameras covered by warranty?', 'Devices include a one-year limited manufacturer warranty.'],
      ] : [
        ['How does the eufy Smart Door Lock work?', 'It provides fingerprint, keypad, key and app access with remote controls for connected homes.'],
        ['Can I control it while away from home?', 'Yes. Once connected and configured, the eufy Security app supports remote controls and alerts.'],
        ['Is the lock weatherproof?', 'The device is designed with IP65 weather protection and wireless battery operation.'],
      ]} />

      {!isCamera && <section className="security-app-band"><picture><source media="(max-width: 768px)" srcSet={`${A}doorlock-app-mobile.png`} /><img src={`${A}doorlock-app-desktop.jpg`} alt="eufy Security app" /></picture><div><h2>Get the eufy Security App</h2><p>Control access, review activity and manage your Smart Door Lock from one app.</p><span><img src={`${A}google-play.png`} alt="Get it on Google Play" /><img src={`${A}apple-store.png`} alt="Download on the App Store" /></span></div></section>}
    </main>
  );
}

function ConfiguredPage({ page, config }) {
  const [choice, setChoice] = useState(config.choices?.[0] || '');
  return (
    <main className={`live-page configured-page configured-page--${config.theme} configured-page--layout-${config.layout}`}>
      <section className="configured-hero">
        <picture><source media="(max-width: 768px)" srcSet={`${A}${config.heroMobile}`} /><img src={`${A}${config.hero}`} alt="" /></picture>
        <div><span>{config.eyebrow}</span><h1>{config.headline}</h1><p>{config.subheadline}</p><a className="live-red-button" href="#page-offers">{config.cta}</a></div>
      </section>
      <section className="configured-intro" id="page-offers">
        <h2>{config.sectionTitle}</h2><p>{config.sectionCopy}</p>
        {config.choices && <div className="configured-builder">{config.choices.map((item) => <button type="button" className={choice === item ? 'active' : ''} onClick={() => setChoice(item)} key={item}>{item}</button>)}<LocalLink className="live-red-button" href="/contact">NEXT</LocalLink></div>}
        {config.offers && <div className="configured-offers">{config.offers.map((offer) => <article key={offer.name}>{offer.badge && <span>{offer.badge}</span>}<h3>{offer.name}</h3><strong>{offer.value}</strong><b>{offer.price}</b><ul>{offer.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul><LocalLink className="live-red-button" href="/contact">SELECT AND CONTINUE</LocalLink></article>)}</div>}
        {config.features && <div className="configured-features">{config.features.map((feature, index) => <article key={feature}><b>0{index + 1}</b><h3>{feature}</h3></article>)}</div>}
      </section>
      <LiveFaq items={[
        [`How can I get ${page.title}?`, 'Select the offer above or contact PLDT Home to check eligibility and availability for your account.'],
        ['Can existing PLDT Home customers avail?', 'Yes, subject to your current plan, account status, service area and the applicable offer mechanics.'],
        ['Where can I get more help?', 'Use PLDT Home support or visit the contact page for assistance.'],
      ]} />
    </main>
  );
}

function PageContent({ page }) {
  const path = page.canonical || page.href;
  if (path === '/fiber') return <FiberPlansPageV2 LinkComponent={LocalLink} />;
  if (path === '/fiberprepaid') return <PrepaidPageV2 LinkComponent={LocalLink} />;
  if (path === '/security/cameras') return <SecurityProductPageV2 type="cameras" LinkComponent={LocalLink} />;
  if (path === '/security/door-lock') return <SecurityProductPageV2 type="doorlock" LinkComponent={LocalLink} />;
  const presentation = presentationForPath(path);
  return presentation ? <ConfiguredPage page={page} config={presentation} /> : <DetailPage page={page} />;
}

function DetailPage({ page }) {
  const theme = detailThemes[page.theme] || detailThemes.internet;
  const isInternet = page.theme === 'internet';
  const related = SITE_PAGES.filter((item) => item.href !== page.href && !item.canonical && (item.theme === page.theme || item.category === page.category)).slice(0, 3);

  return (
    <main className="detail-page">
      <div className="detail-breadcrumb">
        <Breadcrumb separator="/">
          <Breadcrumb.Item key="home"><LocalLink href="/">Home</LocalLink></Breadcrumb.Item>
          <Breadcrumb.Item key="category">{page.category}</Breadcrumb.Item>
          <Breadcrumb.Item key="page">{page.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <section className="detail-hero">
        <picture>
          <source media="(min-width: 769px)" srcSet={`${A}${theme.desktop}`} />
          <img src={`${A}${theme.mobile}`} alt="" />
        </picture>
        <div className="detail-hero__shade" />
        <div className="detail-hero__copy">
          <span>{theme.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <LocalLink className="detail-cta" href={isInternet ? '/plan-recommender' : '/contact'}>{theme.cta}</LocalLink>
        </div>
      </section>

      <section className="detail-intro">
        <div className="detail-section-heading">
          <span>{page.category}</span>
          <h2>Everything you need, connected at home</h2>
          <p>Explore a clear, dependable PLDT Home experience with options designed around how your household connects, works and unwinds.</p>
        </div>
        <div className="detail-feature-row">
          {theme.features.map((feature, index) => (
            <div className="detail-feature" key={feature}>
              <strong>0{index + 1}</strong>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {isInternet && (
        <section className="detail-plans">
          <div className="detail-section-heading">
            <span>POPULAR PLANS</span>
            <h2>Choose the plan that works for your home</h2>
          </div>
          <div className="plan-grid">
            {planCards.map((plan) => (
              <article className="plan-card" key={plan.href}>
                <span>{plan.name}</span>
                <h3>{plan.speed}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.detail}</p>
                <LocalLink href={plan.href}>EXPLORE PLAN</LocalLink>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="detail-related">
        <div className="detail-section-heading">
          <span>KEEP EXPLORING</span>
          <h2>More from PLDT Home</h2>
        </div>
        <div className="related-links">
          {related.map((item) => (
            <LocalLink href={item.href} key={item.href}>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </LocalLink>
          ))}
        </div>
      </section>

      <section className="detail-faq">
        <div className="detail-section-heading">
          <span>NEED HELP?</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>How can I check if this is available in my area?</summary>
            <p>Use the Plan Recommender or contact PLDT Home to verify service availability for your address.</p>
          </details>
          <details>
            <summary>Can existing customers upgrade or add this service?</summary>
            <p>Yes. Eligibility depends on your current plan and location. Open your PLDT Home account or use the upgrade link to review available options.</p>
          </details>
          <details>
            <summary>Where can I track my request?</summary>
            <p>Use Track My PLDT Home Request from the black service bar above.</p>
          </details>
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span>404</span>
      <h1>We couldn’t find that page.</h1>
      <p>The link may have changed, or the page may no longer be available.</p>
      <LocalLink className="detail-cta" href="/">BACK TO PLDT HOME</LocalLink>
    </main>
  );
}

function Footer({ securityPage = false }) {
  return (
    <footer className={`site-footer${securityPage ? ' site-footer--security' : ''}`}>
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => <LocalLink href={href} key={label}>{label}</LocalLink>)}
        </nav>
        <div className="social-links">
          {socialLinks.map(([image, label, href]) => <a href={href} aria-label={label} key={label}><img src={`${A}${image}`} alt="" /></a>)}
        </div>
        <a className="copyright" href="https://main.pldt.com/">©PLDT Inc.</a>
      </div>
    </footer>
  );
}

export default function App() {
  const pathname = useLocalRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [searchRun, setSearchRun] = useState(0);
  const [searchHistory, setSearchHistory] = useState(readSearchHistory);
  const [showCookies, setShowCookies] = useState(() => localStorage.getItem('pldt-cookie-consent') !== 'accepted');
  const currentPage = pageForPath(pathname);

  const acceptCookies = () => {
    localStorage.setItem('pldt-cookie-consent', 'accepted');
    setShowCookies(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = (restoreFocus = true) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSubmittedQuery('');
    if (restoreFocus) requestAnimationFrame(() => document.querySelector('.search-trigger')?.focus?.());
  };

  const changeSearchQuery = (value) => {
    const nextValue = typeof value === 'string' ? value : '';
    setSearchQuery(nextValue);
    if (nextValue.trim() !== submittedQuery) setSubmittedQuery('');
  };
  const voice = useVoiceSearch(searchOpen, changeSearchQuery);

  const submitSearch = (eventOrQuery) => {
    if (typeof eventOrQuery !== 'string') eventOrQuery?.preventDefault?.();
    const nextQuery = (typeof eventOrQuery === 'string' ? eventOrQuery : searchQuery).trim();
    if (!nextQuery) return;
    voice.stop();
    voice.clearStatus();
    setSearchQuery(nextQuery);
    setSubmittedQuery(nextQuery);
    setSearchRun((current) => current + 1);
    setSearchHistory((current) => {
      const next = [nextQuery, ...current.filter((item) => item.toLowerCase() !== nextQuery.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      } catch {
        // Search still works when storage is unavailable.
      }
      return next;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch {
      // Ignore unavailable storage.
    }
  };

  useEffect(() => {
    if (searchOpen) requestAnimationFrame(() => document.querySelector('.header-search .arco-input')?.focus?.());
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (searchOpen) closeSearch(true);
        if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setSubmittedQuery('');
    document.title = LIVE_DOCUMENT_TITLES[pathname] || (pathname === '/'
      ? 'Fiber-Fast and Reliable Internet with PLDT Home'
      : `${currentPage?.title || 'Page not found'} | PLDT Home`);
  }, [pathname, currentPage]);

  return (
    <div className="app-shell">
      <Header
        currentPath={pathname}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchOpen={searchOpen}
        query={searchQuery}
        onOpenSearch={openSearch}
        onCloseSearch={closeSearch}
        onChangeQuery={changeSearchQuery}
        onSubmitSearch={submitSearch}
        voice={voice}
      />
      <SearchPanel
        open={searchOpen}
        query={searchQuery}
        submittedQuery={submittedQuery}
        history={searchHistory}
        aiEnabled={aiEnabled}
        onAiChange={setAiEnabled}
        searchRun={searchRun}
        voiceStatus={voice.status}
        onClose={() => closeSearch(true)}
        onSelectQuery={submitSearch}
        onClearHistory={clearSearchHistory}
      />
      <div className="app-content" inert={searchOpen || menuOpen ? true : undefined}>
        {showCookies && <CookieNotice onAccept={acceptCookies} />}
      <ServiceBar pathname={pathname} />
        {pathname === '/' ? (
          <main>
            <Hero />
            <QuickLinks />
          </main>
        ) : currentPage ? <PageContent page={currentPage} /> : <NotFoundPage />}
        <Footer securityPage={pathname.startsWith('/security/')} />
      </div>
    </div>
  );
}
