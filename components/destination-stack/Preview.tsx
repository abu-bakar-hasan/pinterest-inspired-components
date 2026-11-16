'use client';

import { usePreviewToast } from './PreviewToast';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCards } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Airplane01Icon } from '@hugeicons/core-free-icons';
import cappadocia from './assets/abubakarhasan-components-cappadocia.webp';
import pyramid from './assets/abubakarhasan-components-pyramid.webp';
import wall from './assets/abubakarhasan-components-great-wall.webp';
import santorini from './assets/abubakarhasan-components-santorini.webp';
import kyoto from './assets/abubakarhasan-components-kyoto.webp';
import bali from './assets/abubakarhasan-components-bali.webp';
import petra from './assets/abubakarhasan-components-petra.webp';
import dolomites from './assets/abubakarhasan-components-dolomites.webp';

const destinations = [
  { name: 'Cappadocia', location: 'Göreme, Turkey', image: cappadocia, alt: 'Hot air balloons above Cappadocia at sunrise' },
  { name: 'The Great Wall', location: 'Beijing, China', image: wall, alt: 'The Great Wall winding across green mountain ridges' },
  { name: 'The Great Pyramid', location: 'Giza, Egypt', image: pyramid, alt: 'Golden limestone pyramid under a turquoise sky' },
  { name: 'Santorini', location: 'Oia, Greece', image: santorini, alt: 'Blue-domed church and whitewashed buildings above the Aegean Sea' },
  { name: 'Kyoto', location: 'Kyoto, Japan', image: kyoto, alt: 'Vermilion torii gates along a forest path at Fushimi Inari' },
  { name: 'Bali', location: 'Ubud, Indonesia', image: bali, alt: 'Emerald rice terraces and palms in soft morning light' },
  { name: 'Petra', location: 'Petra, Jordan', image: petra, alt: 'Rose sandstone Treasury framed by the narrow Siq canyon' },
  { name: 'The Dolomites', location: 'Braies, Italy', image: dolomites, alt: 'Wooden boats on a turquoise alpine lake beneath the Dolomites' },
];

export default function DestinationStack() {
  const notify = usePreviewToast();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const reducedMotion = useReducedMotion();

  return <div className="sc-destination-demo sc-new-demo">
    <Swiper
      modules={[EffectCards, A11y]}
      effect="cards"
      grabCursor
      rewind
      speed={reducedMotion ? 0 : 400}
      cardsEffect={{ slideShadows: false, perSlideOffset: 8, perSlideRotate: 3, rotate: !reducedMotion }}
      className="sc-destination-deck"
      tabIndex={0}
      role="region"
      aria-label="Destinations. Swipe or use the left and right arrow keys to browse."
      onSwiper={swiper => { swiperRef.current = swiper; }}
      onSlideChange={swiper => { setActive(swiper.activeIndex); setSelected(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); swiperRef.current?.slideNext(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); swiperRef.current?.slidePrev(); }
      }}
    >
      {destinations.map((place, index) => <SwiperSlide key={place.name} className="sc-destination-slide">
        <article className="sc-destination-card" inert={index !== active} aria-hidden={index !== active}>
          <div className="sc-destination-image"><Image src={place.image} alt={place.alt} fill sizes="(max-width: 640px) 65vw, 360px" /><HugeiconsIcon icon={Airplane01Icon} className="sc-destination-plane" aria-hidden="true" /></div>
          <div className="sc-destination-caption"><h3>{place.name}</h3><p>{place.location}</p></div>
          <button type="button" className="sc-destination-book" aria-pressed={selected && index === active} onClick={() => { setSelected(!selected); notify(selected ? 'Trip selection cleared.' : 'Trip selected — demo only, no booking made.'); }}>{selected && index === active ? 'Trip selected' : 'Book Now'}</button>
        </article>
      </SwiperSlide>)}
    </Swiper>
  </div>;
}
