'use client';

import { usePreviewToast } from './PreviewToast';

import { useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { MountainIcon } from '@hugeicons/core-free-icons';
import snow from './assets/abubakarhasan-components-snow.webp';
import alps from './assets/abubakarhasan-components-alps.webp';
import desert from './assets/abubakarhasan-components-desert.webp';

const themes = [
  { name: 'Mount McLoughlin', description: 'A breath of alpine air.', image: snow, alt: 'Snow-covered volcanic summit against a deep blue sky' },
  { name: 'Alps', description: 'The last light on the peaks.', image: alps, alt: 'Jagged alpine peaks glowing orange in the evening light' },
  { name: 'Sahara Desert', description: 'A quieter kind of wilderness.', image: desert, alt: 'Sculptural orange sand dunes at sunset' },
];

export default function LandscapeThemes() {
  const notify = usePreviewToast();
  const [offset, setOffset] = useState(0);
  return <div className="sc-landscape-demo sc-new-demo">
    <div className="sc-landscape-row">
      {[0, 1, 2].map((slot) => { const theme = themes[(slot + offset) % themes.length]; return <article className="sc-landscape-card" key={slot}>
        <Image src={theme.image} alt={theme.alt} fill sizes="(max-width: 640px) 28vw, 200px" />
        <HugeiconsIcon icon={MountainIcon} className="sc-landscape-mark" aria-hidden="true" />
        <div className="sc-landscape-copy"><h3>{theme.name}</h3><p>{theme.description}</p><button type="button" aria-label={`Change ${theme.name} landscape`} onClick={() => { setOffset(value => (value + 1) % themes.length); notify('Landscape theme changed.'); }}>Change</button></div>
      </article>; })}
    </div>
  </div>;
}
