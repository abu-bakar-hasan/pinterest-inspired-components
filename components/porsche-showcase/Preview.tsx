import Image from 'next/image';
import photo from './assets/abubakarhasan-components-porsche.webp';

export default function PorscheShowcase() {
  return <article className="sc-porsche-demo sc-new-demo">
    <div className="sc-porsche-image"><Image src={photo} alt="Ice-grey Porsche 911 GT3 RS rear quarter with a black wing and red wheel" fill sizes="(max-width: 640px) 85vw, 420px" /></div>
    <div className="sc-porsche-copy"><h3>Porsche 911<span>GT3 RS</span></h3><p>Timeless, iconic, and unapologetically bold. A study in sculpted lines, precise details, and the unmistakable shape of a driving icon.</p></div>
  </article>;
}
