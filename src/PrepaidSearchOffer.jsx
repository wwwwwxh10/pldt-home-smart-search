import React, { useEffect, useId, useRef, useState } from 'react';
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
  const trackId = useId();
  const [position, setPosition] = useState({ visible: 3, atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    const measure = () => {
      const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
      setPosition({
        visible: Math.max(1, Math.round((track.clientWidth + 12) / step)),
        atStart: track.scrollLeft < 2,
        atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    measure();
    return () => { observer.disconnect(); track.removeEventListener('scroll', measure); };
  }, []);

  const move = (direction) => {
    const track = trackRef.current;
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    track.scrollBy({ left: direction * step * position.visible, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <div className="prepaid-search-offer">
      <div className="prepaid-search-offer__carousel" role="region" aria-label={`${tier.speed} load packages`} aria-roledescription="carousel">
        <button className="prepaid-search-offer__arrow prepaid-search-offer__arrow--previous" type="button" aria-label="Previous load packages" aria-controls={trackId} disabled={position.atStart} onClick={() => move(-1)}><IconLeft aria-hidden="true" /></button>
        <div ref={trackRef} id={trackId} className="prepaid-search-offer__track" role="list">
          {tier.prices.map((price, index) => {
            const badge = PACKAGE_BADGES[tier.speed]?.[index];
            return <div className="prepaid-search-offer__card" key={PREPAID_VALIDITIES[index]} role="listitem">
              {badge && <span className={`prepaid-search-offer__badge${badge === 'NEW!' ? ' prepaid-search-offer__badge--new' : ''}`}>{badge}</span>}
              <strong>{price}</strong>
              <span className="prepaid-search-offer__validity">FOR {PREPAID_VALIDITIES[index]}</span>
            </div>;
          })}
        </div>
        <button className="prepaid-search-offer__arrow prepaid-search-offer__arrow--next" type="button" aria-label="Next load packages" aria-controls={trackId} disabled={position.atEnd} onClick={() => move(1)}><IconRight aria-hidden="true" /></button>
      </div>
      <div className="prepaid-search-offer__footer">
        <p>Now with speeds of up to 100 and 300 Mbps and one-year subscription!</p>
        <a className="search-feature__cta prepaid-search-offer__cta" href={PREPAID_LOAD_URL} target="_blank" rel="noreferrer">LOAD HERE <IconRight aria-hidden="true" /></a>
      </div>
    </div>
  );
}
