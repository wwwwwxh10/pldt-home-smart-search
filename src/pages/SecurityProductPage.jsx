import React, { useState } from 'react';
import {
  IconCamera, IconLock, IconMobile, IconRobot, IconSound, IconUnlock, IconWifi,
} from '@arco-design/web-react/icon';
import './security-page.css';
import { SecurityIcon } from './SecurityIcons';

const ASSET_ROOT = '/assets/';

const featureSets = {
  cameras: [
    { image: 'cameras-feature-2k.png', label: '2K Crystal Clear Videos', Icon: IconCamera },
    { image: 'cameras-feature-ai.png', label: 'Built-in AI for Human and Motion Detection', Icon: IconRobot },
    { image: 'cameras-feature-audio.png', label: 'Two-way Audio', Icon: IconSound },
    { image: 'cameras-feature-mobile.png', label: 'Instant Mobile Alerts & Notification', Icon: IconMobile },
  ],
  doorlock: [
    { image: 'doorlock-feature-unlock.png', label: 'Multiple ways to unlock your door', Icon: IconUnlock },
    { image: 'doorlock-feature-control.png', label: 'Control from anywhere', Icon: IconMobile },
    { image: 'doorlock-feature-autolock.png', label: 'Auto-lock feature', Icon: IconLock },
    { image: 'doorlock-feature-wireless.png', label: 'Wireless and weatherproof', Icon: IconWifi },
  ],
};

const cameraProducts = [
  {
    name: 'Tapo Indoor Camera C110',
    shortName: 'Tapo Indoor Camera C110',
    tagline: 'Indoor safety and security 24/7 while you’re away from home.',
    image: 'cameras-product-tapo.png',
    tabImage: 'cameras-tab-tapo.png',
    price: '₱89/mo*',
    term: 'Locked in 24 mos.',
    cash: '₱1,099/pc',
    href: 'https://www.pldthome.com/security/cameras/tapo-indoor-camera-application',
    features: [
      {
        icon: '2K',
        Icon: IconCamera,
        title: '2K clear and crisp videos are captured',
        copy: 'View clear & crisp live or recorded footages via the app. Video capture is optimized both for day and night settings',
      },
      {
        icon: 'AI',
        Icon: IconRobot,
        title: 'Built-In AI',
        copy: 'Know who’s in your home with the built-in artificial intelligence enabling the following features:\n\na. Human & Motion detection – identifies whether a person is within the camera’s view. Also, it automatically tracks whenever a motion is detected.\n\nb. Crying detection – user is alerted whenever a crying sound is within range',
      },
      {
        icon: 'AUDIO',
        Icon: IconSound,
        title: 'Two-way Audio',
        copy: 'Communicate in real-time through the built-in mic and speaker',
      },
    ],
  },
  {
    name: 'eufy Outdoor Cam 2C Pro',
    shortName: 'eufy Outdoor Cam 2C Pro',
    tagline: 'Outdoor safety and security for your home perimeter 24/7',
    image: 'cameras-product-outdoor.png',
    tabImage: 'cameras-tab-eufy-outdoor.png',
    price: '₱789/mo*',
    term: 'Locked in 36 mos.',
    cash: '₱20,995/set',
    href: 'https://www.pldthome.com/security/cameras/eufy-outdoor-camera-application',
    features: [
      {
        icon: '2K',
        Icon: IconCamera,
        title: '2K Crystal Clear Videos',
        copy: 'View clear & crisp live or recorded footages via the app. Video capture is optimized both for day and night settings',
      },
      {
        icon: 'IP67',
        Icon: IconWifi,
        title: 'IP67 Rated Weatherproof Cameras',
        copy: 'Ensure real outdoor coverage with two cameras that can be installed anywhere within your perimeter. IP67 certification ensures resistance to dust and water',
      },
      {
        icon: '180',
        Icon: IconMobile,
        title: 'Wireless with up to 180 Days Battery Life',
        copy: 'No LAN cable and power cable. One full charge of the battery can be good for up to 6 months use and wi-fi connection',
      },
      {
        icon: 'LED',
        Icon: IconCamera,
        title: 'LED Spotlight',
        copy: 'Have a detailed night view of who’s out there. Good deterrent for intruders.',
      },
    ],
  },
  {
    name: 'eufy Indoor Camera C220',
    shortName: 'eufy Indoor Camera C220',
    tagline: 'Indoor safety and security 24/7 while you’re away from home.',
    image: 'cameras-product-indoor.png',
    tabImage: 'cameras-tab-eufy-indoor.png',
    price: '₱119/mo*',
    term: 'Locked in 36 mos.',
    cash: '₱2,299/pc',
    href: 'https://www.pldthome.com/security/cameras/eufy-indoor-camera-application',
    features: [
      {
        icon: '2K',
        Icon: IconCamera,
        title: '2K Crystal Clear Videos',
        copy: 'View clear & crisp live or recorded footages via the app. Video capture is optimized both for day and night settings',
      },
      {
        icon: 'AI',
        Icon: IconRobot,
        title: 'Built-In AI',
        copy: 'Know who’s in your home with the built-in artificial intelligence enabling the following features:\n\na. Human & Motion detection – identifies whether a person is within the camera’s view. Also, it automatically tracks whenever a motion is detected.\n\nb. Crying detection – user is alerted whenever a crying sound is within range',
      },
      {
        icon: '360',
        Icon: IconCamera,
        title: '360° Pan & Tilt Surveillance',
        copy: 'Completely monitor your home without blind spots',
      },
    ],
  },
];

const doorLockProduct = {
  name: 'eufy Smart Door Lock',
  tagline: 'Front door security and control 24/7 and from anywhere',
  image: 'doorlock-product.png',
  price: '₱649/mo*',
  term: 'Locked in 24 mos.',
  cash: '₱13,299/pc',
  features: [
    {
      icon: 'LOCK',
      Icon: IconUnlock,
      title: 'Multiple ways to unlock your door',
      copy: 'Door access can be either through biometrics, mobile app, keypad, or traditional key',
    },
    {
      icon: 'APP',
      Icon: IconWifi,
      title: 'Control from anywhere',
      copy: 'With the wi-fi connectivity and security app, the smart doorlock can be controlled by authorized user remotely',
    },
    {
      icon: 'AUTO',
      Icon: IconLock,
      title: 'Autolock feature',
      copy: 'A built-in sensor detects when the door is closed and locks automatically behind the user',
    },
    {
      icon: 'IP65',
      Icon: IconWifi,
      title: 'Wireless and weatherproof',
      copy: 'No LAN and power cable needed. One full charge of the battery can be good for up to one year use. IP65 certification ensures dust/water resistance',
    },
  ],
};

const cameraFaqs = [
  [
    'How can I purchase a Home Security Device?',
    'You can purchase a eufy or a Tapo security device through PLDT Home website, PLDT and Smart Stores, and Telesales.',
    (LinkComponent) => (
      <p>
        You can purchase a eufy or a Tapo security device through{' '}
        <SmartLink as={LinkComponent} href="/smarthome">PLDT Home website</SmartLink>, PLDT and Smart Stores, and Telesales.
      </p>
    ),
  ],
  [
    'When will I receive my Home Security Device?',
    '',
    () => (
      <><p>Delivery times may vary depending on your location:</p><ul className="sp2-faq__answer-list">
        <li>Metro Manila: 1-2 days</li>
        <li>Luzon: 3-5 days</li>
        <li>Visayas and Mindanao: 5-7 days</li>
      </ul></>
    ),
  ],
  ['How many Home Security Devices can I purchase?', 'Your PLDT representative will confirm how many Home Security Devices you can include in your order.'],
  ['Does my Home Security Device come with a warranty?', 'Yes. All Home Security Devices come with a 1-year warranty from the date of purchase.'],
  [
    'How long does it take to replace a device covered by warranty?',
    '',
    () => (
      <><p>Once your warranty replacement has been approved, you can expect to receive replacement device within:</p><ul className="sp2-faq__answer-list">
        <li><strong>Metro Manila:</strong> 7-10 working days</li>
        <li><strong>Outside Metro Manila:</strong> 10-15 working days</li>
      </ul></>
    ),
  ],
];

const doorLockFaqs = [
  [
    'How can I avail the new device offers?',
    'Existing PLDT subscribers can just visit PLDT Store, PLDT Website https://www.pldthome.com/smarthome, or call 171, to avail the device offers. Subscriber can choose from up to 4 payment options charged to their PLDT bill: 36 months, 24 months, 12 months, or one-time payment. For convenience, availed devices can be delivered within 2-3 days within MM and 5-7 days outside MM from confirmation of order.\n\nFor subscriber who opted for delivery, a fee of ₱150 shall be charged per transaction. This will be charged to subscriber’s next bill.',
    (LinkComponent) => (
      <ul className="sp2-faq__answer-list">
        <li>
          Existing PLDT subscribers can just visit PLDT Store, PLDT Website{' '}
          <SmartLink as={LinkComponent} href="/smarthome">https://www.pldthome.com/smarthome</SmartLink>, or <strong>call 171</strong>, to avail the device offers. Subscriber can choose from up to 4 payment options charged to their PLDT bill: 36 months, 24 months, 12 months, or one-time payment. For convenience, availed devices can be delivered within 2-3 days within MM and 5-7 days outside MM from confirmation of order.
        </li>
        <li>For subscriber who opted for delivery, a fee of ₱150 shall be charged per transaction. This will be charged to subscriber’s next bill.</li>
      </ul>
    ),
  ],
  [
    'How do I install and operate these devices?',
    'Installing these devices are possible in a Do-It-Yourself (DIY) manner. Since the devices are connected wirelessly through PLDT Fiber’s high-speed internet, installation of the indoor and outdoor camera can be done in minutes using the screws, mounts, and brackets provided in the packaging.\n\nFor the video doorbell and door lock, mounting can be done DIY or professionally, depending on the subscriber’s preferred location.\n\nFirst-time set-up requires the installation of the eufy Security App on your Android or iOS mobile devices.\n\nStep-by-step videos and text guides are provided in the eufy Security App for:\n1. Adding a new device: camera, doorbell, or door lock\n2. Set-up of WiFi connection\n3. Homebase hub pairing for cameras\n4. Mounting or physical installation of the device.\n\nFurther instructions are also provided in the user manual and support website of eufy. For more details, you may visit https://support.eufylife.com/s/',
  ],
  [
    'How long is the warranty period and who do I contact for after-sales servicing?',
    'All devices are covered by a 1-year warranty from the date of purchase. PLDT frontliners can guide you in troubleshooting device connectivity. Eufy partners can be contacted through digital channels or physical stores for actual device troubleshooting or replacing defective units. Please visit https://www.pldthome.com/eufy-support for more details.',
  ],
  ['What is the SLA in case that my device under warranty is for replacement?', 'End-to-end replacement SLA:\n\nMetro Manila: 7-10 working days\n\nOutside Metro Manila: 10-15 working days'],
  ['Up to how many Home Security Device units can I avail?', 'The PLDT agent who will process your order will inform you on the maximum number of Home Security Device units you can avail. (Limit for LEG- Indoor Cameras: 6 units, limit for HEG- Outdoor Cameras: 2 units)'],
  ['Can I view live/ recorded videos from multiple cameras at the same time?', 'For EUFY: No. Only 1 camera can be viewed at a time in the eufySecurity app. However, snapshots of the last event for every device are shown in the app’s homescreen. As for recorded events, these are sequentially arranged in the app and can be filtered per day/ device/ event type/ detection type for easier browsing.\n\nFor TAPO: Yes. Multiple cameras can be viewed simultaneously in the TAPO app. User can view 4 cameras in a single screen, he/she just need to press the split screen view while viewing the live feed.. For recorded events, these are sequentially arranged in the app and can be filtered per day/ device/ event type/ detection type for easier browsing.'],
  ['Can these devices still work even with power interruption?', 'eufy Cameras and Tapo Cameras require the device and homebase to be powered ON at all times.'],
  ['What microSD card can I use for storage for the eufy Indoor Camera 2K?', 'We recommend using a class 10 high-quality microSD card.\n\nEufy supports up to 128 GB microSD card.\n\nTapo supports up to 512 GB microSD Card. The microSD card must be inserted in the device and formatted in the app before using it to store encrypted video recordings.'],
  ['Up to to how many days of recording can the microSD card support?', 'The indoor cameras can record for hundreds of hours with a large SD card, with a 128GB card holding approximately 384 hours of 1080p video. The actual duration depends on the SD card size and the recording resolution and settings (e.g. motion detection and foot traffic). When the card is full, it automatically overwrites the oldest footage.\n\nVideo Quality | Micro SD card capacity | Total number or hours recorded | No. of minutes recorded | Approx. number of events (1.5 mins max per event) | Approx. Number of days recorded\nSPEED | 16 GB | 48 | 2880 | 1920 | 19\nSPEED | 32 GB | 96 | 5760 | 3840 | 38\nSPEED | 64 GB | 192 | 11520 | 7680 | 77\nSPEED | 128 GB | 384 | 23040 | 15360 | 154\nSPEED | 256 GB | 768 | 46080 | 30720 | 307\nSPEED | 512 GB | 1536 | 92160 | 61440 | 614'],
  ['Do I have to connect my eufy Outdoor Camera to a power source?', 'The eufy Outdoor Cameras are equipped with a built in rechargeable battery. For first time use, you just have to charged it for 6-7 hours using a micro USB cable (supplied) and a 5V/2A charger. After full charge, you may install wirelessly the devices.'],
  ['How do I charge the battery of the eufy Outdoor Camera?', 'There are two ways to charge your eufy Outdoor Camera:\n\n1. Connect the camera to the rear of your eufy HomeBase 2 using the provided micro USB charging cable.\n\n2. Connect the camera to a 5V/2A power adapter using the provided micro USB charging cable, then plug the power adapter into a wall outlet.'],
  ['How long does the eufy Outdoor Camera’s battery last on one charge?', 'In the most common usage scenarios (Optimal Battery Life working mode), a fully charged camera can last for:\n\nUp to 6 months for the eufy Outdoor Camera 2C Pro. Battery life varies and depends on the number of times motion is detected, recording time duration, and environmental temperatures. If you want to know how to extend eufy Outdoor Cameras’s battery life, please refer to eufyCam’s Working Mode: https:ankertechnologycompanyltd.my.site.com/s/article/eufyCam-s-Working-Mode'],
];

function SmartLink({ as: LinkComponent = 'a', href, children, ...props }) {
  return <LinkComponent href={href} {...props}>{children}</LinkComponent>;
}

function FaqText({ text }) {
  return text.split(/(https?:\S+|For EUFY:|For TAPO:)/g).map((part, index) => {
    if (/^https?:/.test(part)) {
      const href = part.replace(/^https:(?!\/\/)/, 'https://');
      return <a key={index} href={href}>{href}</a>;
    }
    return /^For (EUFY|TAPO):$/.test(part) ? <strong key={index}>{part}</strong> : part;
  });
}

function DoorFaqAnswer({ index, answer }) {
  const paragraphs = answer.split('\n\n');
  const list = (entries, ordered = false) => {
    const Tag = ordered ? 'ol' : 'ul';
    return <Tag className="sp2-faq__answer-list">{entries.map(text => <li key={text}><FaqText text={text.replace(/^\d\. /, '')} /></li>)}</Tag>;
  };
  if (index === 1) return <>
    <p>{paragraphs[0]}</p>
    {list([paragraphs[1], paragraphs[2], paragraphs[3].split('\n')[0]])}
    {list(paragraphs[3].split('\n').slice(1), true)}
    <p><FaqText text={paragraphs[4]} /></p>
  </>;
  if (index === 3) return <><p>{paragraphs[0]}</p>{list(paragraphs.slice(1))}</>;
  if (index === 4) return <><p>{answer.split(' (Limit')[0]}</p><p>(Limit{answer.split(' (Limit')[1]}</p></>;
  if (index === 7) return <>
    <p>We recommend using a class 10 high-quality microSD card;</p>
    {list(['Eufy supports up to 128 GB microSD card.', 'Tapo supports up to 512 GB microSD Card.'])}
    <p>The microSD card must be inserted in the device and formatted in the app before using it to store encrypted video recordings.</p>
  </>;
  if (index === 8) return <>
    <p>{paragraphs[0]}</p>
    <div className="sp2-faq__table-scroll" role="region" aria-label="Camera recording capacity" tabIndex={0}>
      <table className="sp2-faq__table">
        <thead><tr>{['Video Quality', 'Micro SD card capacity', 'Total number or hours recorded', 'No. of minutes recorded', 'Approx. number of events (1.5 mins max per event)', 'Approx. Number of days recorded', 'Tapo Indoor Camera C110', 'Eufy Indoor Camera C200'].map(title => <th scope="col" key={title}>{title}</th>)}</tr></thead>
        <tbody>{[[16,48,2880,1920,19],[32,96,5760,3840,38],[64,192,11520,7680,77],[128,384,23040,15360,154],[256,768,46080,30720,307],[512,1536,92160,61440,614]].map(([gb,...values], row) => <tr key={gb} className={gb === 64 || gb === 128 ? 'is-highlighted' : ''}>
          {row === 0 && <td rowSpan={6} className="sp2-faq__quality">SPEED</td>}
          <td>{gb} GB</td>{values.map((value, column) => <td key={column}>{value}</td>)}
          <td className="is-supported">Supported</td><td className={gb <= 128 ? 'is-supported' : 'is-unsupported'}>{gb <= 128 ? 'Supported' : 'Not Supported'}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </>;
  if (index === 10) return <><p>{paragraphs[0]}</p>{list(paragraphs.slice(1), true)}</>;
  if (index === 11) return <>
    <p>{paragraphs[0]}</p>{list(['Up to 6 months for the eufy Outdoor Camera 2C Pro'])}
    <p><FaqText text={paragraphs[1].replace(/^Up to 6 months for the eufy Outdoor Camera 2C Pro\. /, '')} /></p>
  </>;
  return paragraphs.map(text => <p key={text}><FaqText text={text} /></p>);
}

function SecurityFaq({ items, showViewAll, LinkComponent }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="sp2-faq" id="security-faqs">
      <div className="sp2-shell sp2-faq__inner">
        <h2>Frequently Asked Questions</h2>
        <div className="sp2-faq__list">
          {items.map(([question, answer, renderAnswer], index) => {
            const isOpen = activeIndex === index;
            return (
              <article className={`sp2-faq__item${isOpen ? ' is-open' : ''}`} key={question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                >
                  <span>{question}</span>
                  <span className="sp2-faq__chevron" aria-hidden="true" />
                </button>
                {isOpen && (renderAnswer ? renderAnswer(LinkComponent) : showViewAll ? <DoorFaqAnswer index={index} answer={answer} /> : <p>{answer}</p>)}
              </article>
            );
          })}
        </div>
        {showViewAll && (
          <SmartLink as={LinkComponent} className="sp2-button sp2-faq__more" href="https://www.pldthome.com/eufy-support">
            VIEW ALL FAQS
          </SmartLink>
        )}
      </div>
    </section>
  );
}

function FeatureShowcase({ type }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const features = featureSets[type];
  const isCamera = type === 'cameras';

  return (
    <section className="sp2-features">
      <div className="sp2-shell sp2-features__grid">
        <div className="sp2-features__copy">
          <h2>{isCamera
            ? 'You and your family can keep your home safe and have peace of mind'
            : 'Safeguard your home and loved ones with advanced locking technology'}</h2>
          <div className="sp2-feature-picker" role="tablist" aria-label="Product features">
            {features.map(({ label, Icon }, index) => (
              <button
                type="button"
                role="tab"
                aria-label={label}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? 'is-active' : ''}
                onClick={() => setActiveIndex(index)}
                key={label}
              >
                <span className="sp2-feature-picker__icon"><SecurityIcon name={(isCamera ? ['video', 'motion', 'audio', 'alert'] : ['unlock', 'remote', 'lock', 'weather'])[index]} /></span>
                <span className="sp2-feature-picker__label">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="sp2-features__visual" role="tabpanel">
          <img src={`${ASSET_ROOT}${features[activeIndex].image}`} alt={features[activeIndex].label} />
        </div>
      </div>
    </section>
  );
}

function ProductFeature({ feature }) {
  return (
    <li className="sp2-product-feature">
      <span className="sp2-product-feature__icon" aria-hidden="true">
        <SecurityIcon name={feature.icon} product />
      </span>
      <div>
        <h4>{feature.title}</h4>
        <p>{feature.copy}</p>
      </div>
    </li>
  );
}

function ProductCard({ product, isCamera, LinkComponent }) {
  return (
    <article className="sp2-product-card">
      <div className="sp2-product-card__media">
        <h3 aria-hidden="true">{product.name}</h3>
        <img src={`${ASSET_ROOT}${product.image}`} alt={product.name} />
      </div>
      <div className="sp2-product-card__copy">
        <h3>{product.name}</h3>
        <p className="sp2-product-card__tagline">{product.tagline}</p>
        <p className="sp2-product-card__price-label">Monthly installment per unit starts at:</p>
        <div className="sp2-product-price">
          <strong>{product.price}</strong>
          <span>{product.term}</span>
        </div>
        <p className="sp2-product-card__cash">One time payment is <strong>{product.cash}</strong></p>
        <p className="sp2-product-card__terms">*Other installment options are available in the application form.{!isCamera && <><br />₱150 delivery fee per transaction will be charged to the next bill.</>}</p>
        <ul className="sp2-product-features">
          {product.features.map((feature) => <ProductFeature feature={feature} key={feature.title} />)}
        </ul>
        {isCamera ? (
          <SmartLink as={LinkComponent} className="sp2-button sp2-product-card__cta" href={product.href}>GET IT NOW</SmartLink>
        ) : (
          <button className="sp2-button sp2-product-card__cta is-disabled" type="button" disabled>OUT OF STOCK</button>
        )}
        {isCamera ? (
          <p className="sp2-product-card__note"><strong>Note:</strong> Exclusive for PLDT Home subscribers.<br />₱150 delivery fee per transaction will be charged to the next bill.</p>
        ) : (
          <p className="sp2-product-card__note"><strong>New Smart Door Locks Coming Soon.</strong></p>
        )}
      </div>
    </article>
  );
}

function ProductSection({ type, LinkComponent }) {
  const isCamera = type === 'cameras';
  const [activeProduct, setActiveProduct] = useState(0);
  const product = isCamera ? cameraProducts[activeProduct] : doorLockProduct;

  return (
    <section className="sp2-products" id="devices">
      <div className="sp2-shell">
        <h2>Choose the best security partner for your home</h2>
        {isCamera && (
          <div className="sp2-product-tabs" role="tablist" aria-label="Camera products">
            {cameraProducts.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeProduct === index}
                className={activeProduct === index ? 'is-active' : ''}
                onClick={() => setActiveProduct(index)}
                key={item.name}
              >
                <img src={`${ASSET_ROOT}${item.tabImage || item.image}`} alt="" />
                <span>{item.shortName}</span>
              </button>
            ))}
          </div>
        )}
        <ProductCard product={product} isCamera={isCamera} LinkComponent={LinkComponent} />
      </div>
    </section>
  );
}

function CameraSupport({ LinkComponent }) {
  const capabilities = [
    { image: 'cameras-support-document.png', title: 'Frequently Asked Questions', copy: "Learn more about your device's settings, storage, battery, and aftersales support" },
    { image: 'cameras-support-settings.png', title: 'Troubleshoot Guides', copy: 'Step-by-step guide to diagnose and resolve common device issues.' },
    { image: 'cameras-support-rocket.png', title: 'Getting Started & Setup', copy: 'Setup your device with easy, step-by-step instructions' },
  ];

  return (
    <section className="sp2-support">
      <div className="sp2-shell">
        <h2>Need more support?</h2>
        <p className="sp2-support__intro">Select your device model to access FAQs, Troubleshooting Guides, and Device Setup.</p>
        <div className="sp2-support-capabilities">
          {capabilities.map(({ image, title, copy }) => (
            <article key={title}>
              <img src={`${ASSET_ROOT}${image}`} alt="" />
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
        <div className="sp2-support-brands">
          <article>
            <div className="sp2-support-brands__copy">
              <img className="sp2-support-brand-logo" src={`${ASSET_ROOT}cameras-support-tapo-logo.png`} alt="tapo" />
              <p>Get personalized help to connect to your Tapo device's access point.</p>
              <SmartLink as={LinkComponent} className="sp2-button" href="https://www.pldthome.com/tapo-support">GO TO SUPPORT</SmartLink>
            </div>
            <img src={`${ASSET_ROOT}cameras-support-tapo-device.png`} alt="Tapo Indoor Camera C110" />
          </article>
          <article>
            <div className="sp2-support-brands__copy">
              <img className="sp2-support-brand-logo" src={`${ASSET_ROOT}cameras-support-eufy-logo.png`} alt="eufy" />
              <p>Get personalized help to connect to your Eufy device's access point.</p>
              <SmartLink as={LinkComponent} className="sp2-button" href="https://www.pldthome.com/eufy-support">GO TO SUPPORT</SmartLink>
            </div>
            <img src={`${ASSET_ROOT}cameras-support-eufy-device.png`} alt="eufy Indoor Camera C220" />
          </article>
        </div>
      </div>
    </section>
  );
}

function DoorLockApp() {
  return (
    <section className="sp2-app">
      <div className="sp2-app__copy">
        <h2>Get the <img className="sp2-app__logo" src={`${ASSET_ROOT}eufy-logo.svg`} alt="eufy" /> Security App</h2>
        <p>Experience live videos, event recordings, alert notifications and settings from multiple devices using the eufy security app</p>
        <div className="sp2-app__stores">
          <a href="https://play.google.com/store/apps/details?id=com.oceanwing.battery.cam&hl=en&gl=US" aria-label="Get it on Google Play">
            <img src={`${ASSET_ROOT}doorlock-google-play.png`} alt="Get it on Google Play" />
          </a>
          <a href="https://apps.apple.com/app/id1424956516" aria-label="Download on the App Store">
            <img src={`${ASSET_ROOT}doorlock-apple-store.png`} alt="Download on the App Store" />
          </a>
        </div>
      </div>
      <picture>
        <source media="(max-width: 767px)" srcSet={`${ASSET_ROOT}doorlock-app-mobile.png`} />
        <img src={`${ASSET_ROOT}doorlock-app-desktop.jpg`} alt="eufy Security app on a mobile phone" />
      </picture>
    </section>
  );
}

export default function SecurityProductPage({ type = 'cameras', LinkComponent = 'a' }) {
  const normalizedType = type === 'door-lock' ? 'doorlock' : type;
  const isCamera = normalizedType === 'cameras';
  const pageClass = isCamera ? 'sp2-page--cameras' : 'sp2-page--doorlock';

  return (
    <main className={`sp2-page ${pageClass}`}>
      <section className="sp2-hero">
        <div className="sp2-hero__copy">
          <h1>{isCamera ? 'Smart, affordable security built for your lifestyle' : 'Safer as you brave the world'}</h1>
          <p>Keep watch over the things that matter most</p>
          <a className="sp2-button" href="#devices">APPLY NOW</a>
        </div>
        <picture className="sp2-hero__media">
          <source media="(max-width: 767px)" srcSet={`${ASSET_ROOT}${isCamera ? 'cameras-hero-mobile.png' : 'doorlock-hero-mobile.png'}`} />
          <img src={`${ASSET_ROOT}${isCamera ? 'cameras-hero-desktop.png' : 'doorlock-hero-desktop.png'}`} alt="" />
        </picture>
      </section>

      <FeatureShowcase type={normalizedType} />
      <ProductSection type={normalizedType} LinkComponent={LinkComponent} />
      <SecurityFaq
        items={isCamera ? cameraFaqs : doorLockFaqs}
        showViewAll={!isCamera}
        LinkComponent={LinkComponent}
      />
      {isCamera ? <CameraSupport LinkComponent={LinkComponent} /> : <DoorLockApp />}
    </main>
  );
}
