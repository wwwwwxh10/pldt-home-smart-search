import React, { useMemo, useState } from 'react';
import {
  IconCalendar,
  IconDown,
  IconFile,
  IconGift,
  IconLeft,
  IconLock,
  IconRight,
  IconWifi,
} from '@arco-design/web-react/icon';
import './prepaid-page.css';
import LOAD_GUIDES from './prepaid-guides.json';

const A = '/assets/';

const PREPAID_TIERS = {
  '50 Mbps': [
    { price: '₱50', duration: '1 DAY' },
    { price: '₱199', duration: '7 DAYS' },
    { price: '₱379', duration: '15 DAYS', isNew: true },
    { price: '₱699', duration: '30 DAYS', bestValue: 'BEST VALUE AT ₱23.3/DAY' },
    { price: '₱6,999', duration: '365 DAYS' },
  ],
  '100 Mbps': [
    { price: '₱99', duration: '1 DAY' },
    { price: '₱379', duration: '7 DAYS' },
    { price: '₱549', duration: '15 DAYS' },
    { price: '₱999', duration: '30 DAYS', bestValue: 'BEST VALUE AT ₱33.3/DAY' },
    { price: '₱9,999', duration: '365 DAYS' },
  ],
  '300 Mbps': [
    { price: '₱199', duration: '1 DAY' },
    { price: '₱699', duration: '7 DAYS' },
    { price: '₱999', duration: '15 DAYS' },
    { price: '₱1,499', duration: '30 DAYS', bestValue: 'BEST VALUE AT ₱49.97/DAY' },
    { price: '₱14,999', duration: '365 DAYS' },
  ],
};

const BENEFITS = [
  { label: 'Abot-kaya', icon: IconGift },
  { label: 'Mag-load ng kailangan', icon: IconCalendar },
  { label: 'No monthly bill', icon: IconFile },
  { label: 'No contract', icon: IconLock },
  { label: 'Unli Fiber', icon: IconWifi },
];

const LOADING_CHANNELS = [
  ['prepaid-load-pldt.png', 'PLDT MyHome'],
  ['prepaid-load-maya.png', 'Maya Shop'],
  ['prepaid-load-gcash.png', 'GCash'],
  ['prepaid-load-sm.png', 'SM Customer Service'],
  ['prepaid-load-sarisari.png', 'Sari-sari Store'],
  ['prepaid-load-paygo.png', 'Pay & Go'],
  ['prepaid-load-ecpay.png', 'ECPay'],
];


const TOP_UP_STEPS = [
  {
    image: 'prepaid-step-1.png',
    copy: <>Pumunta sa <strong>Fiber Prepaid log-in page</strong>. Ilagay ang account number at i-click ang <strong>"CONTINUE AS GUEST"</strong>.</>,
  },
  {
    image: 'prepaid-step-2.png',
    copy: <>Piliin ang load, at i-click ang <strong>"Buy Now"</strong>.</>,
  },
  {
    image: 'prepaid-step-3.png',
    copy: <>Piliin ang payment option at magbayad. Sakses!</>,
  },
];

const FAQS = [
  {
    question: 'What is a Fiber Prepaid service?',
    answer: 'Fiber Prepaid is PLDT Home\'s pay-per-use unlimited internet service that is reloadable. Customers can top up for as low as P50/day at 50 Mbps.',
  },
  {
    question: 'Is Fiber Prepaid service available nationwide?',
    answer: 'Fiber Prepaid is available in selected areas where PLDT Fiber facilities are present. Submit an application to check service availability at your address.',
  },
  {
    question: 'Where can I track my Prepaid load and usages?',
    answer: 'Log in to your PLDT Home account using your linked Fiber Prepaid account number to view your active load, validity, and account information.',
  },
];

function ArrowButton({ direction, label, onClick, className = '' }) {
  const Icon = direction === 'previous' ? IconLeft : IconRight;
  return (
    <button className={`pp2-arrow pp2-arrow--${direction} ${className}`} type="button" onClick={onClick} aria-label={label}>
      <Icon />
    </button>
  );
}

function LoadingGuide({ guide }) {
  const [activeStep, setActiveStep] = useState(0);
  const windowStart = Math.max(0, Math.min(activeStep - 1, guide.steps.length - 3));
  return (
    <div className="pp2-guide-slides">
      <div className="pp2-guide-slides__steps" aria-live="polite">
        {guide.steps.slice(windowStart, windowStart + 3).map((step, offset) => {
          const index = windowStart + offset;
          return (
            <button type="button" key={step.label} className={activeStep === index ? 'pp2-is-active' : ''}
              onClick={() => setActiveStep(index)} aria-pressed={activeStep === index}>
              <strong>{step.label}</strong><span>{step.text}</span>
            </button>
          );
        })}
      </div>
      <div className="pp2-guide-slides__visual">
        <img src={`${A}${guide.steps[activeStep].image}`} alt={`${guide.title}: ${guide.steps[activeStep].label}`} />
      </div>
      <div className="pp2-guide-slides__dots" aria-label={`${guide.title} steps`}>
        {guide.steps.map((step, index) => (
          <button type="button" key={step.label} aria-label={`Show ${guide.title} step ${index + 1}`}
            aria-pressed={activeStep === index} className={activeStep === index ? 'pp2-is-active' : ''}
            onClick={() => setActiveStep(index)} />
        ))}
      </div>
    </div>
  );
}

function PrepaidPage({ LinkComponent = 'a' }) {
  const Link = LinkComponent;
  const [tier, setTier] = useState('50 Mbps');
  const [loadStart, setLoadStart] = useState(0);
  const [openGuide, setOpenGuide] = useState(null);
  const [topUpStep, setTopUpStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const plans = PREPAID_TIERS[tier];
  const visiblePlans = useMemo(
    () => [0, 1, 2].map((offset) => ({ ...plans[(loadStart + offset) % plans.length], sourceIndex: (loadStart + offset) % plans.length })),
    [loadStart, plans],
  );

  const selectTier = (nextTier) => {
    setTier(nextTier);
    setLoadStart(0);
  };

  const movePlans = (amount) => {
    setLoadStart((current) => (current + amount + plans.length) % plans.length);
  };

  const moveTopUp = (amount) => {
    setTopUpStep((current) => (current + amount + TOP_UP_STEPS.length) % TOP_UP_STEPS.length);
  };

  return (
    <main className="pp2-page">
      <nav className="pp2-subnav" aria-label="Fiber Prepaid page navigation">
        <div className="pp2-subnav__inner">
          <a href="#prepaid-plans">LOAD HERE</a>
          <a href="#how-to-load">HOW TO LOAD</a>
        </div>
      </nav>

      <section className="pp2-hero" aria-label="PLDT Home Fiber Prepaid">
        <div className="pp2-hero__copy">
          <img className="pp2-hero__logo" src={`${A}prepaid-logo-wide.png`} alt="PLDT Home Fiber Prepaid" />
          <img className="pp2-hero__headline" src={`${A}prepaid-headline-main.png`} alt="Sumakses ka sa unli" />
          <img className="pp2-hero__tagline" src={`${A}prepaid-headline.png`} alt="Mag-PLDT Prepaid na" />
          <a className="pp2-button pp2-button--solid" href="#apply">APPLY NOW</a>
          <p>Already a Fiber Prepaid subscriber? <a href="#prepaid-plans">Load here!</a></p>
        </div>
        <div className="pp2-hero__visual" role="img" aria-label="A family enjoying PLDT Home Fiber Prepaid" />
      </section>

      <section className="pp2-benefits" id="apply" aria-labelledby="pp2-benefits-title">
        <div className="pp2-benefits__inner">
          <h1 id="pp2-benefits-title">Stay connected with PLDT Home Fiber Prepaid</h1>
          <div className="pp2-benefit-list">
            {BENEFITS.map(({ label }, index) => (
              <div className="pp2-benefit" key={label}>
                <img className="pp2-benefit__icon" src={`${A}prepaid-benefit-${index + 1}.svg`} alt="" />
                <strong>{label}</strong>
              </div>
            ))}
          </div>

          <article className="pp2-price-card">
            <div className="pp2-price-card__top">
              <div><small>Up to</small><strong>50 Mbps</strong></div>
              <div className="pp2-price-card__price"><strong>₱999</strong><span>ONLY</span></div>
            </div>
            <p>Pay the one-time fee and enjoy <strong>30 days</strong> of <br /><strong>unlimited fiber</strong> for <strong>FREE</strong></p>
            <Link className="pp2-button pp2-button--light" href="https://pldthomefiber-prepaid.zite.so/">APPLY NOW</Link>
            <small className="pp2-price-card__terms">Promo runs from October 3 to 31, 2026. DTI Fair Trade Permit No. FTEB-269233 Series of 2026.</small>
          </article>
        </div>
        <picture className="pp2-benefits__mobile-router">
          <img src={`${A}prepaid-benefits-mobile.png`} alt="PLDT Home Fiber Prepaid modem" />
        </picture>
      </section>

      <section className="pp2-plans" id="prepaid-plans" aria-labelledby="pp2-plans-title">
        <div className="pp2-section-width">
          <h2 id="pp2-plans-title">Sumakses sa mas mabilis na Unli Fiber Prepaid!</h2>
          <p className="pp2-plans__intro">Now with speeds of up to 100 and 300 Mbps and one-year subscription!</p>

          <div className="pp2-tier-tabs" role="tablist" aria-label="Fiber Prepaid speed">
            {Object.keys(PREPAID_TIERS).map((name, index) => (
              <button
                className={tier === name ? 'pp2-is-active' : ''}
                key={name}
                type="button"
                role="tab"
                aria-selected={tier === name}
                onClick={() => selectTier(name)}
              >
                {index > 0 && <img src={`${A}prepaid-tab-new.png`} alt="New" />}
                <span>{name}</span>
              </button>
            ))}
          </div>

          <div className="pp2-plan-carousel" aria-live="polite">
            <ArrowButton direction="previous" label="Previous load offers" onClick={() => movePlans(-1)} />
            <div className="pp2-plan-carousel__viewport">
              <div className="pp2-plan-carousel__track">
                {visiblePlans.map((plan, position) => (
                  <article className="pp2-plan-card" key={`${tier}-${plan.sourceIndex}-${position}`}>
                    {plan.isNew && <img className="pp2-plan-card__new" src={`${A}prepaid-tab-new.png`} alt="New offer" />}
                    {plan.bestValue && <span className="pp2-plan-card__best">{plan.bestValue}</span>}
                    <strong className="pp2-plan-card__price">{plan.price}</strong>
                    <span className="pp2-plan-card__rule" />
                    <b>FOR {plan.duration}</b>
                  </article>
                ))}
              </div>
            </div>
            <ArrowButton direction="next" label="Next load offers" onClick={() => movePlans(1)} />
          </div>

          <div className="pp2-dots" role="group" aria-label="Load offer slides">
            {plans.map((plan, index) => (
              <button
                className={loadStart === index ? 'pp2-is-active' : ''}
                type="button"
                key={`${tier}-${plan.price}-${plan.duration}`}
                aria-label={`Show offer ${index + 1}`}
                aria-pressed={loadStart === index}
                onClick={() => setLoadStart(index)}
              />
            ))}
          </div>

          <p className="pp2-plans__login">Log in to PLDT Home to avail these load options.</p>
          <Link className="pp2-button pp2-button--solid pp2-button--load" href="https://pldthome.info/prepaidload">LOAD HERE</Link>
        </div>
      </section>

      <section className="pp2-channels" aria-labelledby="pp2-channels-title">
        <div className="pp2-section-width">
          <h2 id="pp2-channels-title">Now more accessible loading channels</h2>
          <div className="pp2-channel-grid">
            {LOADING_CHANNELS.map(([image, name]) => <img src={`${A}${image}`} alt={name} key={name} />)}
          </div>
        </div>
      </section>

      <section className="pp2-how" id="how-to-load" aria-labelledby="pp2-how-title">
        <div className="pp2-section-width">
          <h2 id="pp2-how-title">How to avail of Fiber Prepaid Data Packages</h2>
          <div className="pp2-how__list">
            {LOAD_GUIDES.map((guide, index) => {
              const isOpen = openGuide === index;
              return (
                <article className={`pp2-guide ${isOpen ? 'pp2-is-open' : ''}`} key={guide.title}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`pp2-guide-${index}`} onClick={() => setOpenGuide(isOpen ? null : index)}>
                      <span>{guide.title}</span><IconDown aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="pp2-guide__body" id={`pp2-guide-${index}`} hidden={!isOpen}>
                    {isOpen && <LoadingGuide guide={guide} />}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pp2-topup" aria-labelledby="pp2-topup-title">
        <div className="pp2-section-width">
          <h2 id="pp2-topup-title">Mas pinadaling pag-top-up!<br className="pp2-topup__desktop-break" />{' '}
            Sundin lang itong <em>istep-by-the-istep</em> para <em>sumakses</em>!
          </h2>
          <div className="pp2-topup__carousel">
            <ArrowButton direction="previous" label="Previous top-up step" onClick={() => moveTopUp(-1)} className="pp2-topup__arrow" />
            <div className="pp2-topup__grid">
              {TOP_UP_STEPS.map((item, index) => (
                <article className={topUpStep === index ? 'pp2-is-active' : ''} key={item.image}>
                  <img src={`${A}${item.image}`} alt={`Fiber Prepaid top-up step ${index + 1}`} />
                  <div><b>{index + 1}</b><p>{item.copy}</p></div>
                </article>
              ))}
            </div>
            <ArrowButton direction="next" label="Next top-up step" onClick={() => moveTopUp(1)} className="pp2-topup__arrow" />
          </div>
          <div className="pp2-dots pp2-topup__dots" role="group" aria-label="Top-up steps">
            {TOP_UP_STEPS.map((item, index) => (
              <button className={topUpStep === index ? 'pp2-is-active' : ''} type="button" key={item.image} aria-label={`Show top-up step ${index + 1}`} aria-pressed={topUpStep === index} onClick={() => setTopUpStep(index)} />
            ))}
          </div>
        </div>
      </section>

      <section className="pp2-faq" aria-labelledby="pp2-faq-title">
        <div className="pp2-faq__inner">
          <h2 id="pp2-faq-title">Frequently Asked Questions</h2>
          <div className="pp2-faq__list">
            {FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`pp2-faq-item ${isOpen ? 'pp2-is-open' : ''}`} key={item.question}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`pp2-faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}>
                      <span>{item.question}</span><IconDown aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="pp2-faq-item__answer" id={`pp2-faq-answer-${index}`} hidden={!isOpen}><p>{item.answer}</p></div>
                </article>
              );
            })}
          </div>
          <Link className="pp2-button pp2-button--outline" href="/support-fiber-prepaid">SHOW MORE</Link>
        </div>
      </section>
    </main>
  );
}

export default PrepaidPage;
