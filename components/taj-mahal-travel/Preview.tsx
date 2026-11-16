'use client';

import { usePreviewToast } from './PreviewToast';

import { useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import photo from './assets/abubakarhasan-components-taj-mahal.webp';

export default function TravelCard() {
  const notify = usePreviewToast();
  const [selected, setSelected] = useState(false);
  return (
    <article className="sc-travel-demo">
      <Image src={photo} alt="White marble Taj Mahal and its reflecting pool beneath a clear blue sky" fill sizes="(max-width: 640px) 85vw, 420px" className="sc-travel-photo" />
      <div className="sc-travel-info">
        <div className="sc-travel-title"><h3>Taj Mahal, India</h3></div>
        <p>February 1–8 · Hosted escape</p>
        <div className="sc-travel-bottom"><strong>$169</strong><button type="button" aria-pressed={selected} onClick={() => { setSelected(!selected); notify(selected ? 'Selection cleared.' : 'Escape selected — demo only, no booking made.'); }}>{selected ? 'Selected' : 'Book Now'}<HugeiconsIcon icon={ArrowUpRight01Icon} /></button></div>
      </div>
    </article>
  );
}
