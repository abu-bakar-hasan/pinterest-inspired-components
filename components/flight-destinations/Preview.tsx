'use client';

import { usePreviewToast } from './PreviewToast';

import { useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Airplane01Icon, FavouriteIcon } from '@hugeicons/core-free-icons';
import sf from './assets/abubakarhasan-components-san-francisco.webp';
import ny from './assets/abubakarhasan-components-new-york.webp';

const destinations = [
  { name: 'New York', cabin: 'Economy', price: '$120', airport: 'JFK', image: ny, alt: 'Tree-lined Manhattan avenue with the Chrysler Building in the distance' },
  { name: 'San Francisco', cabin: 'Premium economy', price: '$240', airport: 'SFO', image: sf, alt: 'Golden Gate Bridge above Pacific waves at sunset' },
];

export default function FlightDestinations() {
  const notify = usePreviewToast();
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  return <div className="sc-flight-demo sc-new-demo">
    <div className="sc-flight-pair">
      {destinations.map((place, index) => <article key={place.airport} className={`sc-flight-card ${index === 0 ? 'sc-flight-immersive' : ''}`}>
        <div className="sc-flight-image"><Image src={place.image} alt={place.alt} fill sizes="(max-width: 640px) 40vw, 260px" /></div>
        <div className="sc-flight-copy">
          <h3>{place.name}</h3><p>{place.cabin}</p>
          <div className="sc-flight-meta"><span>from <strong>{place.price}</strong></span><span><HugeiconsIcon icon={Airplane01Icon} />{place.airport}</span></div>
          <div className="sc-flight-actions"><button type="button" onClick={() => { setSelected(selected === place.name ? null : place.name); notify(selected === place.name ? 'Destination selection cleared.' : `${place.name} selected — flight search demo.`); }}>{selected === place.name ? 'Selected' : 'Search flight'}</button><button type="button" className="sc-flight-save" aria-label={`${saved.includes(place.airport) ? 'Unsave' : 'Save'} ${place.name}`} aria-pressed={saved.includes(place.airport)} onClick={() => { setSaved(current => current.includes(place.airport) ? current.filter(code => code !== place.airport) : [...current, place.airport]); notify(saved.includes(place.airport) ? `${place.name} removed from favourites.` : `${place.name} added to favourites.`); }}><HugeiconsIcon icon={FavouriteIcon} /></button></div>
        </div>
      </article>)}
    </div>
  </div>;
}
