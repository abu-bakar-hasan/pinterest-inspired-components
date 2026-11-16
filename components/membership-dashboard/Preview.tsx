'use client';

import { usePreviewToast } from './PreviewToast';

import { useId, useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, BubbleChatIcon, UserGroupIcon, Calendar03Icon, Add01Icon } from '@hugeicons/core-free-icons';
import avatar from './assets/abubakarhasan-components-learning-avatar.webp';
import { MembershipHome, MembershipChat, MembershipTasks } from './MembershipTabs';

const groups = {
  All: { total: '2,840', values: [420, 490, 610, 602, 560, 740, 810] },
  Active: { total: '1,642', values: [260, 310, 450, 430, 390, 510, 590] },
  Enrolled: { total: '1,930', values: [320, 410, 530, 520, 460, 632, 710] },
};
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function MembershipDashboard() {
  const notify = usePreviewToast();
  const [group, setGroup] = useState<keyof typeof groups>('Enrolled');
  const [month, setMonth] = useState(5);
  const [section, setSection] = useState('Team');
  const id = useId().replace(/:/g, '');
  const data = groups[group];
  const x = 24 + month * 59;
  return (
    <div className="sc-member-demo">
      <header className="sc-member-header">
        <div><p>December 10, 2026</p><h2>Good Morning</h2></div>
        <Image src={avatar} alt="Pastel learning objects" className="sc-member-avatar" />
      </header>
      <div hidden={section !== 'Home'} id={`${id}-panel-Home`} role="tabpanel" aria-labelledby={`${id}-tab-Home`}><MembershipHome openTeam={() => setSection('Team')} openChat={() => setSection('Chat')} openTasks={() => setSection('Task')} /></div>
      <div hidden={section !== 'Chat'} id={`${id}-panel-Chat`} role="tabpanel" aria-labelledby={`${id}-tab-Chat`}><MembershipChat /></div>
      <div hidden={section !== 'Task'} id={`${id}-panel-Task`} role="tabpanel" aria-labelledby={`${id}-tab-Task`}><MembershipTasks /></div>
      <div hidden={section !== 'Team'} id={`${id}-panel-Team`} role="tabpanel" aria-labelledby={`${id}-tab-Team`}><section className="sc-member-panel" aria-label="Member analytics">
        <div className="sc-member-overview">
          <div>
            <div className="sc-member-tabs" aria-label="Member group">
              {(Object.keys(groups) as (keyof typeof groups)[]).map(item => <button key={item} type="button" aria-pressed={group === item} onClick={() => setGroup(item)}>{item}</button>)}
            </div>
            <h3>Members</h3><p>Manage total course members<br />and their progress</p>
          </div>
          <div className="sc-member-total"><strong>{data.total}</strong><span>Total Members</span></div>
        </div>
        <div className="sc-member-chart">
          <svg viewBox="0 0 400 115" role="img" aria-label={`${group} members in ${months[month]}: ${data.values[month]}`}>
            <defs>
              <linearGradient id={`${id}-line`}><stop stopColor="#d88e7b" /><stop offset=".42" stopColor="#fc1746" /><stop offset=".7" stopColor="#d921ca" /><stop offset="1" stopColor="#4b8df2" /></linearGradient>
              <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ef87d6" stopOpacity=".36" /><stop offset="1" stopColor="#f1daf0" stopOpacity=".08" /></linearGradient>
            </defs>
            <path d="M0 68 C25 93 34 67 57 68 S70 52 84 67 S91 55 110 55 S130 44 145 45 S170 43 191 46 S228 68 251 45 S286 32 309 38 S353 62 400 30 L400 115 L0 115Z" fill={`url(#${id}-fill)`} />
            <path d="M0 68 C25 93 34 67 57 68 S70 52 84 67 S91 55 110 55 S130 44 145 45 S170 43 191 46 S228 68 251 45 S286 32 309 38 S353 62 400 30" fill="none" stroke={`url(#${id}-line)`} strokeWidth="2.2" />
            <circle cx="167" cy="45" r="5" fill="#ee3756" />
            <path d={`M${x} 25 V94`} stroke="#222" strokeWidth="1" />
            <rect x={x - 27} y="16" width="54" height="30" rx="15" fill="#080808" />
            <text x={x} y="36" textAnchor="middle" fill="white" fontSize="17">{data.values[month]}</text>
          </svg>
          <div className="sc-member-months">{months.map((label, index) => <button type="button" key={label} aria-pressed={month === index} aria-label={`${label}: ${data.values[index]} members`} onClick={() => setMonth(index)}>{label}</button>)}</div>
        </div>
      </section></div>
      <nav className="sc-member-nav" aria-label="Dashboard demo"><div className="sc-member-tablist" role="tablist" aria-label="Dashboard tabs">
        {[{ name: 'Home', icon: Home01Icon }, { name: 'Chat', icon: BubbleChatIcon }, { name: 'Team', icon: UserGroupIcon }, { name: 'Task', icon: Calendar03Icon }].map(item => <button type="button" key={item.name} role="tab" id={`${id}-tab-${item.name}`} aria-controls={`${id}-panel-${item.name}`} aria-selected={section === item.name} tabIndex={section === item.name ? 0 : -1} onClick={() => setSection(item.name)} onKeyDown={event => {
          const tabs = ['Home', 'Chat', 'Team', 'Task'];
          const index = tabs.indexOf(item.name);
          const target = event.key === 'ArrowRight' ? tabs[(index + 1) % tabs.length] : event.key === 'ArrowLeft' ? tabs[(index + tabs.length - 1) % tabs.length] : event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[3] : null;
          if (target) { event.preventDefault(); setSection(target); document.getElementById(`${id}-tab-${target}`)?.focus(); }
        }}><HugeiconsIcon icon={item.icon} /><span>{item.name}</span></button>)}
        </div><button type="button" className="sc-member-add" aria-label="Add sample member" onClick={() => notify('Sample invitation ready — no invitation sent.')}><HugeiconsIcon icon={Add01Icon} /></button>
      </nav>
    </div>
  );
}
