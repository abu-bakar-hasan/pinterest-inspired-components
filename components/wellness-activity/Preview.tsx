'use client';

import { usePreviewToast } from './PreviewToast';

import { useState } from 'react';
import WellnessTabs from './WellnessTabs';
import { HugeiconsIcon } from '@hugeicons/react';
import { FireIcon, DropletIcon, Moon02Icon, Dumbbell01Icon, WorkoutRunIcon, Layers01Icon, ChartIncreaseIcon, MoreVerticalIcon } from '@hugeicons/core-free-icons';

export default function WellnessActivity() {
  const notify = usePreviewToast();
  const [tab, setTab] = useState('Activity');
  const [water, setWater] = useState(1200);
  const [options, setOptions] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  return (
    <div className="sc-wellness-demo">
      <div className="sc-wellness-shell">
        <div className="sc-wellness-content"><div hidden={tab !== 'Activity'} className="sc-wellness-grid">
          <div className="sc-health-card sc-health-calories"><h3><HugeiconsIcon icon={FireIcon} />Calories</h3><div className="sc-health-value"><p><strong>5,839</strong><span>kcal</span></p><svg className="sc-health-ring" viewBox="0 0 50 50" aria-label="Calorie goal 65 percent"><circle cx="25" cy="25" r="20" /><circle cx="25" cy="25" r="20" pathLength="100" strokeDasharray="65 100" /></svg></div></div>
          <button type="button" className="sc-health-card sc-health-water" onClick={() => { const next = water >= 2500 ? 1200 : Math.min(water + 250, 2500); setWater(next); notify(water >= 2500 ? 'Water tracker reset.' : `Water updated to ${next.toLocaleString('en-US')} ml.`); }} aria-label={`Water ${water} milliliters. Add 250 milliliters; reset at goal.`}><h3><HugeiconsIcon icon={DropletIcon} />Water</h3><div className="sc-health-value"><p aria-live="polite"><strong>{water.toLocaleString('en-US')}</strong><span>ml</span></p><svg className="sc-health-ring" viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r="20" /><circle cx="25" cy="25" r="20" pathLength="100" strokeDasharray={`${water / 25} 100`} /></svg></div></button>
          <div className="sc-health-card sc-health-sleep"><h3><HugeiconsIcon icon={Moon02Icon} />Sleep</h3><div className="sc-health-value"><p><strong>7.30</strong><span>hrs</span></p><div className="sc-health-bars" aria-label="Weekly sleep trend"><i /><i /><i /><i /><i /><i /><i /></div></div></div>
          <div className="sc-health-card sc-health-weight"><h3><HugeiconsIcon icon={Dumbbell01Icon} />Weight</h3><div className="sc-health-value"><p><strong>92</strong><span>kg</span></p><svg className="sc-health-trend" viewBox="0 0 80 55" role="img" aria-label="Weekly weight trend"><path d="M2 48 C7 14 15 47 24 34 S32 5 40 10 S47 48 55 25 S66 34 76 26" /></svg></div></div>
        </div><WellnessTabs key={resetKey} tab={tab} /></div>
        <div className="sc-wellness-bottom"><nav className="sc-wellness-nav" aria-label="Wellness demo">
          {[{ name: 'Activity', icon: FireIcon }, { name: 'Fitness', icon: WorkoutRunIcon }, { name: 'Plans', icon: Layers01Icon }, { name: 'Progress', icon: ChartIncreaseIcon }].map(item => <button type="button" key={item.name} aria-pressed={tab === item.name} onClick={() => setTab(item.name)}><HugeiconsIcon icon={item.icon} /><span>{item.name}</span></button>)}
        </nav><button type="button" className="sc-wellness-more" aria-label="Demo options" aria-expanded={options} onClick={() => setOptions(!options)}><HugeiconsIcon icon={MoreVerticalIcon} /></button></div>
        {options && <div className="sc-wellness-options"><button type="button" onClick={() => { setWater(1200); setResetKey(value => value + 1); setTab('Activity'); setOptions(false); notify('Activity reset.'); }}>Reset demo activity</button></div>}
      </div>
    </div>
  );
}
