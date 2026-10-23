import React, { useId, useState } from 'react';
import { IconLeft, IconPhone, IconRight, IconWifi } from '@arco-design/web-react/icon';
import './fiber-page.css';

const ASSET = '/assets/';

const PLANS = [
  {
    name: 'Fiber Unli 1299',
    speed: '100 Mbps',
    href: 'https://pldthomefiber-unli1299.zite.so/',
    perks: [
      {
        type: 'install',
        lead: 'Free',
        label: 'Installation & Activation',
        href: '/fiber-sale-mechanics-2026',
      },
    ],
  },
  {
    name: 'Fiber Unli 1699',
    speed: '300 Mbps',
    href: 'https://pldthomefiber-unli1699.zite.so/',
    badge: 'MOST POPULAR',
    perks: [
      {
        type: 'igv',
        lead: 'Free 1 year',
        label: 'IGV Game Pass',
        href: '/unligaming-promo',
      },
      {
        type: 'install',
        lead: 'Free',
        label: 'Installation & Activation',
        href: '/fiber-sale-mechanics-2026',
      },
    ],
  },
  {
    name: 'Fiber Unli 2099',
    speed: '500 Mbps',
    href: 'https://pldthomefiber-unli2099.zite.so/',
    perks: [
      {
        type: 'igv',
        lead: 'Free 1 year',
        label: 'IGV Game Pass',
        href: '/unligaming-promo',
      },
      {
        type: 'install',
        lead: 'Free',
        label: 'Installation & Activation',
        href: '/fiber-sale-mechanics-2026',
      },
    ],
  },
];

const FAQS = [
  {
    question: 'What is Fiber?',
    answer: [
      'PLDT Home Fiber is the most powerful broadband suited for households. With its superior Fiber-to-the-Home (FTTH) technology, families can experience equal upload and download speeds of up to 1 Gbps. Being the first carrier of fiber optic services in the country, PLDT Fiber has reached 6.7 million homes passed as of March 2019. It has also been awarded for 2 consecutive years as the Philippines\u2019 Fastest Fixed Internet by Ookla for 2018 and 2019.',
      'Our plans offer a bundled unlimited internet access with a telephone service.',
    ],
  },
  {
    question: 'How does the Unli Calls feature work?',
    answer: [
      'Fiber Unli All Plans come with a landline that allows you to enjoy Unli Calls. With this feature, you get to enjoy free and unlimited calls from your landline to five (5) nominated Smart/Sun/TnT numbers.',
    ],
  },
  {
    question: 'What is the difference between Fiber and DSL?',
    answer: [
      'Both PLDT Home Fiber and DSL can provide a strong reliable internet connection for you and your family.',
      'Direct Subscriber Line (DSL) is an internet connection delivered through a telephone line to your modem without interrupting your telephone service. Our DSL plans use copper wire technology and can deliver download speeds as high as 20 Mbps. It is ideal for those who use the internet for more basic online activities such as browsing the web, sending and receiving emails or pictures, or downloading e-books.',
      'Our Fiber plans use fiber optic technology where the internet connection comes from light signals running through thin glass wires. It can deliver speeds as high as up to 1 Gbps. Unlike DSL, it can provide equal upload and download internet speeds allowing you to send data from your device as fast as you can receive it from others. Uploading is necessary when you\u2019re sending files via email, video calling a friend, backing up data to online storage services, or for gaming online.',
      'With PLDT Home Fiber, you can explore a wider variation of online activities at home on multiple devices from seamless HD quality streaming, to lag-free gaming, and more.',
    ],
  },
  {
    question: 'How is Fiber better than cable internet?',
    answer: [
      'Because PLDT Home Fiber is the most advanced internet service in the country, it\u2019s the only one that can give you access to Cignal HD channels powered by your fiber connection. All of PLDT Home\u2019s products are designed to give you and your family the best online experience at home.',
      'Cable Internet on the other hand uses the same cables you plug in your television set for your broadband access. Therefore, when there are more users, there are more people sharing the bandwidth hence, the slower the internet.',
      'Subscribe to a PLDT Home Fiber plan and enjoy super-fast internet, equal download and upload speeds, plus an option to bundle with our Home Entertainment Plans perfect for your home!',
    ],
  },
  {
    question: 'What\u2019s my contract period if I avail of a Fiber Unli?',
    answer: ['The Fiber Unli plans have a contract period of 36 months.'],
  },
  {
    question: 'Is there an upfront cash-out required when I apply for a Fiber Unli Plan?',
    answer: [
      'No. There is no upfront cash-out required when you apply for a Fiber Unli Plan. However, a \u20b1100 monthly installation fee for your internet service will be charged for 36 months as part of your monthly bill.',
    ],
  },
];

function PlanCard({ plan, LinkComponent }) {
  return (
    <article className={`fp2-plan-card${plan.badge ? ' fp2-plan-card--popular' : ''}`}>
      {plan.badge && (
        <span className="fp2-plan-card__badge">
          <span aria-hidden="true">&#9733;</span>
          {plan.badge}
        </span>
      )}

      <header className="fp2-plan-card__header">
        <h2>{plan.name}</h2>
        <span>Up to</span>
        <strong>{plan.speed}</strong>
      </header>

      <div className="fp2-plan-card__rule"><span>Inclusions</span></div>

      <div className="fp2-inclusions">
        <div className="fp2-inclusion">
          <IconWifi aria-hidden="true" />
          <div>
            <b>Internet</b>
            <span>Unlimited Fiber Internet</span>
          </div>
        </div>
        <div className="fp2-inclusion">
          <IconPhone aria-hidden="true" />
          <div>
            <b>Landline</b>
            <LinkComponent href="/unli-calls">Unli Calls</LinkComponent>
          </div>
        </div>
      </div>

      <div className="fp2-perks">
        <h3>Promo Perks</h3>
        <div className="fp2-perks__grid">
          {plan.perks.map((perk) => (
            <LinkComponent
              className={`fp2-perk fp2-perk--${perk.type}`}
              href={perk.href}
              key={`${plan.name}-${perk.type}`}
              aria-label={`${perk.lead} ${perk.label}`}
            >
              <img src={`${ASSET}fiber-perk-${perk.type}.png`} alt="" />
              <b>{perk.lead}</b>
              <span>{perk.label}</span>
            </LinkComponent>
          ))}
        </div>
      </div>

      <LinkComponent className="fp2-button fp2-plan-card__cta" href={plan.href}>
        SELECT AND CONTINUE
      </LinkComponent>
    </article>
  );
}

function FiberFaq({ LinkComponent }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId().replace(/:/g, '');

  return (
    <section className="fp2-faq" id="faqs" aria-labelledby={`${baseId}-title`}>
      <div className="fp2-faq__inner">
        <h2 id={`${baseId}-title`}>Frequently Asked Questions</h2>
        <div className="fp2-faq__list">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div className={`fp2-faq__item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="fp2-faq__chevron" aria-hidden="true" />
                </button>
                <div
                  className="fp2-faq__answer"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  {item.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            );
          })}
        </div>
        <LinkComponent className="fp2-faq__all" href="/support-internet">VIEW ALL FAQS</LinkComponent>
      </div>
    </section>
  );
}

export default function FiberPlansPage({ LinkComponent = 'a' }) {
  const [activePlan, setActivePlan] = useState(0);

  const selectPrevious = () => {
    setActivePlan((current) => (current - 1 + PLANS.length) % PLANS.length);
  };

  const selectNext = () => {
    setActivePlan((current) => (current + 1) % PLANS.length);
  };

  return (
    <main className="fp2-root">
      <section className="fp2-hero" aria-labelledby="fp2-heading">
        <picture>
          <source media="(max-width: 767px)" srcSet={`${ASSET}fiber-plans-hero-mobile.png`} />
          <img src={`${ASSET}fiber-plans-hero.png`} alt="A PLDT Home Fiber customer enjoying a fast connection" />
        </picture>
        <div className="fp2-hero__copy">
          <img src={`${ASSET}fiber-plans-logo.png`} alt="PLDT Home Fiber Unli" />
          <h1 id="fp2-heading">
            Always work-ready with fast<br className="fp2-hero__desktop-break" />{' '}
            and<br className="fp2-hero__mobile-break" />{' '}reliable connectivity!
          </h1>
        </div>
      </section>

      <section className="fp2-plans" id="plans" aria-label="Fiber Unli plans">
        <div className="fp2-plan-shell">
          <div className="fp2-plan-viewport" id="fp2-plan-carousel">
            <div className="fp2-plan-track" style={{ '--fp2-plan-index': activePlan }}>
              {PLANS.map((plan) => (
                <PlanCard plan={plan} LinkComponent={LinkComponent} key={plan.name} />
              ))}
            </div>
          </div>

          <button
            className="fp2-plan-arrow fp2-plan-arrow--previous"
            type="button"
            aria-label="Show previous plan"
            aria-controls="fp2-plan-carousel"
            onClick={selectPrevious}
          >
            <IconLeft />
          </button>
          <button
            className="fp2-plan-arrow fp2-plan-arrow--next"
            type="button"
            aria-label="Show next plan"
            aria-controls="fp2-plan-carousel"
            onClick={selectNext}
          >
            <IconRight />
          </button>

          <div className="fp2-plan-dots" role="tablist" aria-label="Choose a Fiber Unli plan">
            {PLANS.map((plan, index) => (
              <button
                type="button"
                role="tab"
                aria-label={`Show ${plan.name}`}
                aria-selected={activePlan === index}
                className={activePlan === index ? 'is-active' : ''}
                onClick={() => setActivePlan(index)}
                key={plan.name}
              />
            ))}
          </div>
        </div>

        <p className="fp2-wiring-note">
          Prepare your in-house wiring and have a valid ID with your signature ready before applying.
        </p>
      </section>

      <section className="fp2-exclusive" aria-label="Exclusive PLDT Home Fiber promotions">
        <article className="fp2-exclusive__card">
          <img src={`${ASSET}fiber-exclusive-promo.png`} alt="A customer enjoying her PLDT Home Fiber connection" />
          <div>
            <h2>EXCLUSIVE PROMOS<br />JUST FOR YOU</h2>
            <p>Enjoy these perks and rewards when you subscribe to PLDT Home Fiber today!</p>
            <LinkComponent className="fp2-button" href="/whatsnew">LEARN MORE</LinkComponent>
          </div>
        </article>
      </section>

      <FiberFaq LinkComponent={LinkComponent} />

      <section className="fp2-recommender" aria-labelledby="fp2-recommender-title">
        <div className="fp2-recommender__inner">
          <picture>
            <source media="(max-width: 767px)" srcSet={`${ASSET}fiber-recommender-person-mobile.png`} />
            <img src={`${ASSET}fiber-recommender-person.png`} alt="People using PLDT Home for work, social media and entertainment" />
          </picture>
          <div className="fp2-recommender__copy">
            <h2 id="fp2-recommender-title">Did you find what you&rsquo;re looking for?</h2>
            <p>Let us help you choose the plan that will best suit your needs.</p>
            <LinkComponent className="fp2-button" href="/plan-recommender">
              RECOMMEND THE BEST PLAN FOR ME
            </LinkComponent>
          </div>
        </div>
      </section>
    </main>
  );
}
