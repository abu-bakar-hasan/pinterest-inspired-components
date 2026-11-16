'use client';

import { usePreviewToast } from './PreviewToast';

import { useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Bookmark02Icon, Share01Icon, StarIcon } from '@hugeicons/core-free-icons';
import portrait from './assets/abubakarhasan-components-portrait.webp';

export default function GlassProfile() {
  const notify = usePreviewToast();
  const [saved, setSaved] = useState(false);
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); notify('Component link copied.'); }
    catch { notify('Copy the page address to share this component.'); }
  }
  return <article className="sc-profile-demo sc-new-demo">
    <button type="button" className="sc-profile-share" aria-label="Copy component link" onClick={copyLink}><HugeiconsIcon icon={Share01Icon} /></button>
    <Image src={portrait} alt="Portrait of fictional designer Chloe Harrison" className="sc-profile-avatar" />
    <h3>Chloe Harrison</h3><p className="sc-profile-role">Product designer</p>
    <dl className="sc-profile-stats"><div><dt>Rating</dt><dd><HugeiconsIcon icon={StarIcon} />4.5</dd></div><div><dt>Earned</dt><dd>$15K+</dd></div><div><dt>Rate</dt><dd>$80/hr</dd></div></dl>
    <div className="sc-profile-actions"><button type="button" className="sc-profile-contact" onClick={() => notify('Contact demo — no message has been sent.')}>Get in touch</button><button type="button" className="sc-profile-save" aria-label={saved ? 'Remove saved profile' : 'Save profile'} aria-pressed={saved} onClick={() => { setSaved(!saved); notify(saved ? 'Profile removed from saved items.' : 'Profile saved.'); }}><HugeiconsIcon icon={Bookmark02Icon} /></button></div>
  </article>;
}
