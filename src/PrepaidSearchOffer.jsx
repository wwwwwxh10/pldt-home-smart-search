import React, { useRef } from 'react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import { PREPAID_LOAD_URL, PREPAID_VALIDITIES } from './searchProducts';
import './prepaid-search-offer.css';

const PACKAGE_BADGES = {
  '50 Mbps': { 2: 'NEW!', 3: 'BEST VALUE AT ₱23.3/DAY' },
  '100 Mbps': { 3: 'BEST VALUE AT ₱33.3/DAY' },
  '300 Mbps': { 3: 'BEST VALUE AT ₱49.97/DAY' },
};

export default function PrepaidSearchOffer({ tier }) {
  const trackRef = useRef(null);
  const move = (direction) => trackRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });

  return (
    <div className="prepaid-search-offer">
      <div className="prepaid-search-offer__carousel" role="region" aria-label={`${tier.speed} load packages`}>
        <button className="prepaid-search-offer__arrow" type="button" aria-label="Previous load packages" onClick={() => move(-1)}><IconLeft aria-hidden="true" /></button>
        <div ref={trackRef} className="prepaid-search-offer__track" role="list">
          {tier.prices.map((price, index) => {
            const badge = PACKAGE_BADGES[tier.speed]?.[index];
            return <div className="prepaid-search-offer__card" key={PREPAID_VALIDITIES[index]} role="listitem">
              {badge && <span className={`prepaid-search-offer__badge${badge === 'NEW!' ? ' prepaid-search-offer__badge--new' : ''}`}>{badge}</span>}
              <strong>{price}</strong>
              <span className="prepaid-search-offer__validity">FOR {PREPAID_VALIDITIES[index]}</span>
            </div>;
          })}
        </div>
        <button className="prepaid-search-offer__arrow" type="button" aria-label="Next load packages" onClick={() => move(1)}><IconRight aria-hidden="true" /></button>
      </div>
      <div className="prepaid-search-offer__footer">
        <p>Now with speeds of up to 100 and 300 Mbps and one-year subscription!</p>
        <a className="search-feature__cta prepaid-search-offer__cta" href={PREPAID_LOAD_URL} target="_blank" rel="noreferrer">LOAD HERE <IconRight aria-hidden="true" /></a>
      </div>
    </div>
  );
}
