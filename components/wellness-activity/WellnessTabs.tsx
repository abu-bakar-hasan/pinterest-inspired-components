'use client';

import { useId, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { FireIcon, Dumbbell01Icon, WorkoutRunIcon, Moon02Icon, ChartIncreaseIcon } from '@hugeicons/core-free-icons';
import { usePreviewToast } from './PreviewToast';

const workouts = [
  { name: 'Cardio', title: 'Full Body Burn', minutes: 20, icon: FireIcon },
  { name: 'Strength', title: 'Build Your Strength', minutes: 30, icon: Dumbbell01Icon },
  { name: 'Yoga', title: 'Stretch & Restore', minutes: 15, icon: WorkoutRunIcon },
  { name: 'HIIT', title: 'Quick Energy Boost', minutes: 12, icon: ChartIncreaseIcon },
];
const plans = [
  { name: 'Weight Loss', weeks: 4, day: 12, icon: ChartIncreaseIcon },
  { name: 'Get Fit', weeks: 6, day: 8, icon: WorkoutRunIcon },
  { name: 'Build Muscle', weeks: 8, day: 5, icon: Dumbbell01Icon },
  { name: 'Stay Healthy', weeks: 4, day: 9, icon: Moon02Icon },
];

export default function WellnessTabs({ tab }: { tab: string }) {
  const notify = usePreviewToast();
  const id = useId();
  const [workout, setWorkout] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [plan, setPlan] = useState(0);
  const [period, setPeriod] = useState('30');
  const active = workouts[workout];
  const selected = plans[plan];
  const percent = Math.round(selected.day / (selected.weeks * 7) * 100);
  const monthly = period === '30';
  const dates = monthly ? ['Nov 10', 'Nov 17', 'Nov 24', 'Dec 1', 'Dec 8'] : ['Mon', 'Tue', 'Wed', 'Fri', 'Sun'];
  return <>
    <section hidden={tab !== 'Fitness'} className="sc-wellness-view" aria-label="Fitness">
      <div className="sc-fitness-banner">
        <h3>Today’s Workout</h3><p>{active.title}</p><span>{active.minutes} min</span>
        <div className="sc-fitness-dumbbell" aria-hidden="true"><i /><b /><i /></div>
        <button type="button" className="sc-fitness-play" aria-label={playing ? 'Pause demo workout' : 'Start demo workout'} aria-pressed={playing} onClick={() => { setPlaying(!playing); notify(playing ? 'Demo workout paused.' : `${active.title} selected — workout preview only.`); }}>{playing ? 'Ⅱ' : '▶'}</button>
      </div>
      <div className="sc-wellness-choices">
        {workouts.map((item, index) => <button type="button" key={item.name} aria-pressed={workout === index} onClick={() => { setWorkout(index); setPlaying(false); }}><HugeiconsIcon icon={item.icon} /><span>{item.name}</span></button>)}
      </div>
      <h4>Weekly Activity</h4>
      <div className="sc-fitness-week" role="img" aria-label="Weekly activity: Monday 12, Tuesday 20, Wednesday 25, Thursday 18, Friday 20, Saturday 12, Sunday 20 minutes">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => <div key={day}><div><i style={{ height: `${[35, 60, 75, 50, 60, 35, 60][index]}%` }} /></div><span>{day}</span></div>)}
      </div>
    </section>
    <section hidden={tab !== 'Plans'} className="sc-wellness-view" aria-label="Plans">
      <header className="sc-wellness-view-header"><div><h3>Your Plan</h3><p>Get fitter with a plan that fits you.</p></div><button type="button" aria-label="Next demo plan" onClick={() => { const next = (plan + 1) % plans.length; setPlan(next); notify(`${plans[next].name} plan selected.`); }}>›</button></header>
      <div className="sc-wellness-plan">
        <h3>{selected.name}</h3><p>{selected.weeks} Weeks Plan</p>
        <div className="sc-wellness-target" aria-hidden="true"><i />↗</div>
        <span>Day {selected.day} of {selected.weeks * 7}</span>
        <div className="sc-wellness-plan-progress"><progress max="100" value={percent} aria-label={`${selected.name} plan completion`} /><strong>{percent}%</strong></div>
      </div>
      <h4>Other Plans</h4>
      <div className="sc-wellness-choices sc-wellness-plan-choices">{plans.map((item, index) => index !== plan && <button type="button" key={item.name} onClick={() => { setPlan(index); notify(`${item.name} plan selected.`); }}><HugeiconsIcon icon={item.icon} /><span>{item.name}</span></button>)}</div>
    </section>
    <section hidden={tab !== 'Progress'} className="sc-wellness-view sc-wellness-progress-view" aria-label="Progress">
      <header className="sc-wellness-view-header"><div><h3>Your Progress</h3><p>Track your wellness journey.</p></div><select aria-label="Progress period" value={period} onChange={event => setPeriod(event.target.value)}><option value="30">Last 30 Days</option><option value="7">Last 7 Days</option></select></header>
      <div className="sc-wellness-progress-chart">
        <svg viewBox="0 0 360 155" role="img" aria-label={`Sample weight change: ${monthly ? 'minus 3.2' : 'minus 0.8'} kilograms over ${period} days`}>
          <defs><linearGradient id={`${id}-wash`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d97af7" stopOpacity=".35" /><stop offset="1" stopColor="#d97af7" stopOpacity=".02" /></linearGradient></defs>
          <path d={monthly ? 'M0 35 C20 0 50 48 88 38 S132 54 166 52 S205 67 238 64 S282 88 314 85 S348 88 360 104 L360 140 H0Z' : 'M0 28 C40 20 56 49 88 42 S140 61 166 59 S210 78 238 74 S310 96 360 110 L360 140 H0Z'} fill={`url(#${id}-wash)`} />
          <path d={monthly ? 'M0 35 C20 0 50 48 88 38 S132 54 166 52 S205 67 238 64 S282 88 314 85 S348 88 360 104' : 'M0 28 C40 20 56 49 88 42 S140 61 166 59 S210 78 238 74 S310 96 360 110'} fill="none" stroke="#bd42f4" strokeWidth="3" />
          <path d="M238 35V140M0 140H360" stroke="#eee5f0" /><circle cx="238" cy={monthly ? 64 : 74} r="7" fill="white" stroke="#a13cf0" strokeWidth="4" />
          <rect x="202" y="5" width="73" height="29" rx="10" fill="#9839ef" /><text x="238" y="25" textAnchor="middle" fill="white" fontSize="14">{monthly ? '-3.2' : '-0.8'} kg</text>
        </svg>
        <div className="sc-wellness-chart-dates">{dates.map(date => <span key={date}>{date}</span>)}</div>
      </div>
      <div className="sc-wellness-progress-stats">
        <div><HugeiconsIcon icon={ChartIncreaseIcon} /><p><strong>{monthly ? '-3.2' : '-0.8'} kg</strong><span>Weight</span></p></div>
        <div><HugeiconsIcon icon={FireIcon} /><p><strong>{monthly ? '-1,240' : '-310'}</strong><span>Calories</span></p></div>
        <div><HugeiconsIcon icon={Moon02Icon} /><p><strong>+{monthly ? '1.4' : '0.5'} hrs</strong><span>Sleep</span></p></div>
      </div>
    </section>
  </>;
}
