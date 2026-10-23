import React, { useId, useRef, useState } from 'react';
import { IconCheck, IconRight, IconWifi, IconPhone } from '@arco-design/web-react/icon';
import './search-products.css';
import PrepaidSearchOffer from './PrepaidSearchOffer';

function ProductTabs({ feature, selected, onSelect, baseId }) {
  const tabRefs = useRef([]);

  const selectWithKeyboard = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % feature.items.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + feature.items.length) % feature.items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = feature.items.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  return (
    <div className="search-feature__tabs" role="tablist" aria-label={`${feature.title} options`}>
      {feature.items.map((item, index) => (
        <button
          ref={(element) => { tabRefs.current[index] = element; }}
          key={item.name || item.speed}
          type="button"
          role="tab"
          id={`${baseId}-tab-${index}`}
          aria-selected={selected === index}
          aria-controls={`${baseId}-panel`}
          tabIndex={selected === index ? 0 : -1}
          onClick={() => onSelect(index)}
          onKeyDown={(event) => selectWithKeyboard(event, index)}
        >
          {item.name || item.speed || feature.title}
          {item.badge && <span className="search-feature__tab-badge">{item.badge}</span>}
          {item.isNew && <span className="search-feature__new">NEW!</span>}
        </button>
      ))}
    </div>
  );
}

function FiberFeature({ plan }) {
  return (
    <div className="search-fiber-offer">
      <div className="search-fiber-offer__identity">
        <div className="search-fiber-offer__heading">
          <h3>{plan.name}</h3>
          <p className="search-fiber-offer__speed"><b>{plan.speed}</b></p>
        </div>
        <p className="search-feature__price"><strong>{plan.price}</strong><span>/month</span></p>
      </div>
      <div className="search-fiber-offer__details">
        <h4 className="search-feature__detail-label">Inclusions</h4>
        <div className="search-feature__inclusions">
          <span><IconWifi aria-hidden="true" /> Unlimited Fiber Internet</span>
          <span>
            <IconPhone aria-hidden="true" />
            <a href="https://pldthome.com/unli-calls" target="_blank" rel="noreferrer">
              <span className="search-feature__link-label">Unli Calls</span><IconRight aria-hidden="true" />
            </a>
          </span>
        </div>
        <h4 className="search-feature__detail-label">Promo perks</h4>
        <div className="search-feature__perks">
          {plan.gamePass && <a href="https://pldthome.com/unligaming-promo" target="_blank" rel="noreferrer"><IconCheck aria-hidden="true" /><span className="search-feature__link-label">Free 1 year IGV Game Pass</span><IconRight aria-hidden="true" /></a>}
          <a href="https://pldthome.com/fiber-sale-mechanics-2026" target="_blank" rel="noreferrer"><IconCheck aria-hidden="true" /><span className="search-feature__link-label">Free Installation & Activation</span><IconRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="search-feature__actions">
        <a className="search-feature__cta" href={plan.href} target="_blank" rel="noreferrer">Select and Continue <IconRight aria-hidden="true" /></a>
      </div>
    </div>
  );
}

function DeviceFeature({ product }) {
  return (
    <div className="search-device-offer">
      <div className="search-device-offer__visual"><img src={`/assets/${product.image}`} alt={product.name} /></div>
      <div className="search-device-offer__copy">
        <h3><a href={product.href} target="_blank" rel="noreferrer">{product.name} <IconRight aria-hidden="true" /></a></h3>
        <p>{product.description}</p>
        <ul>{product.features.map((feature) => <li key={feature}><IconCheck aria-hidden="true" />{feature}</li>)}</ul>
      </div>
      <div className="search-device-offer__purchase">
        <p className="search-feature__price"><strong>{product.price}</strong><span>/mo*</span></p>
        <span className="search-device-offer__term">Locked in {product.term}</span>
        <span className="search-device-offer__cash">or {product.cash}</span>
        <a className={`search-feature__cta ${product.outOfStock ? 'search-feature__cta--unavailable' : ''}`} href={product.href} target="_blank" rel="noreferrer">
          {product.outOfStock ? 'OUT OF STOCK' : 'GET IT NOW'}{!product.outOfStock && <IconRight aria-hidden="true" />}
        </a>
      </div>
    </div>
  );
}

export default function SearchProductFeature({ feature }) {
  const [selected, setSelected] = useState(feature.defaultIndex);
  const baseId = useId();
  const item = feature.items[selected];
  const hasTabs = feature.items.length > 1;
  const title = item?.name || item?.speed || feature.title;

  return (
    <section className={`search-feature search-feature--${feature.key}`} aria-label={`${feature.title} featured products`}>
      <div className="search-feature__topline">
        {hasTabs
          ? <ProductTabs feature={feature} selected={selected} onSelect={setSelected} baseId={baseId} />
          : <h2 className="search-feature__title">{title}</h2>}
        {feature.key === 'doorlock' && <a className="search-feature__explore" href={item.href} target="_blank" rel="noreferrer">Explore Door Lock <IconRight aria-hidden="true" /></a>}
      </div>
      <div
        className="search-feature__panel"
        id={`${baseId}-panel`}
        role={hasTabs ? 'tabpanel' : undefined}
        aria-labelledby={hasTabs ? `${baseId}-tab-${selected}` : undefined}
      >
        {feature.key === 'fiber' ? <FiberFeature plan={item} />
          : feature.key === 'prepaid' ? <PrepaidSearchOffer key={item.speed} tier={item} />
            : <DeviceFeature product={item} />}
      </div>
      {feature.key === 'cameras' && <div className="search-feature__note">For PLDT Home subscribers. ₱150 delivery fee. Other installment options available.</div>}
      {feature.key === 'doorlock' && <div className="search-feature__note">New Smart Door Locks Coming Soon.</div>}
    </section>
  );
}
