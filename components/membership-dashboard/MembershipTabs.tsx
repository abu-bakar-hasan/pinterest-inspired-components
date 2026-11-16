'use client';

import { usePreviewToast } from './PreviewToast';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Activity01Icon, Mortarboard01Icon, ChartHistogramIcon, UserGroupIcon, Edit02Icon, ArrowLeft01Icon, SentIcon, Add01Icon, Tick02Icon, Calendar03Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import amina from './assets/abubakarhasan-components-amina.webp';
import leo from './assets/abubakarhasan-components-leo.webp';
import daniel from './assets/abubakarhasan-components-daniel.webp';

export function MembershipHome({ openTeam, openChat, openTasks }: { openTeam: () => void; openChat: () => void; openTasks: () => void }) {
  return <section className="sc-member-panel sc-member-home" aria-label="Community overview">
    <button type="button" className="sc-member-home-summary" onClick={openTeam}>
      <span className="sc-member-home-symbol"><HugeiconsIcon icon={UserGroupIcon} /></span>
      <span className="sc-member-home-number"><strong>1,930</strong><span>Members</span></span>
      <span className="sc-member-faces" aria-hidden="true"><Image src={leo} alt="" /><Image src={amina} alt="" /><Image src={daniel} alt="" /><span>+1.9k</span></span>
    </button>
    <div className="sc-member-home-metrics">
      <button type="button" onClick={openTeam} className="sc-member-metric-active"><HugeiconsIcon icon={Activity01Icon} /><span><strong>1,642</strong><small>Active members</small></span></button>
      <button type="button" onClick={openTeam} className="sc-member-metric-new"><HugeiconsIcon icon={Mortarboard01Icon} /><span><strong>+128</strong><small>New this month</small></span></button>
      <button type="button" onClick={openTasks} className="sc-member-metric-tasks" aria-label="Open task progress"><HugeiconsIcon icon={ChartHistogramIcon} /></button>
    </div>
    <button type="button" className="sc-member-home-activity" onClick={openChat}>
      <span className="sc-member-faces sc-member-faces-online" aria-hidden="true"><Image src={amina} alt="" /><Image src={leo} alt="" /><Image src={daniel} alt="" /></span>
      <span><strong>A little progress, together.</strong><small>Amina and the team are online</small></span>
    </button>
  </section>;
}

const conversations = [
  { id: 'group', name: 'Design community', preview: 'Leo: Ready for our next session?', time: '9:41', unread: 3, image: null, message: 'Morning, team! Ready for our next design session? Bring one idea you would love to explore.' },
  { id: 'amina', name: 'Amina Yusuf', preview: 'The new lesson looks lovely!', time: '9:32', unread: 1, image: amina, message: 'The new lesson looks lovely! I have finished the first exercise and would love your feedback.' },
  { id: 'daniel', name: 'Daniel Kim', preview: 'Thanks for the feedback yesterday.', time: 'Yesterday', unread: 0, image: daniel, message: 'Thanks for the feedback yesterday. I have updated the layout and will share it with the group.' },
];

export function MembershipChat() {
  const notify = usePreviewToast();
  const [current, setCurrent] = useState<string | null>(null);
  const [read, setRead] = useState<string[]>([]);
  const [compose, setCompose] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Record<string, string[]>>({});
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const conversation = conversations.find(item => item.id === current);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, current]);
  function open(id: string) { setCurrent(id); setRead(items => items.includes(id) ? items : [...items, id]); setDraft(''); setCompose(false); }

  return <section className="sc-member-panel sc-member-chat" aria-label="Community messages">
    {conversation ? <>
      <header className="sc-member-chat-heading"><button type="button" className="sc-member-mini-action" aria-label="Back to conversations" onClick={() => { setCurrent(null); setDraft(''); }}><HugeiconsIcon icon={ArrowLeft01Icon} /></button><div><h3>{conversation.name}</h3><p>Demo conversation</p></div></header>
      <div className="sc-member-chat-log" ref={log} role="log" aria-label={`Messages with ${conversation.name}`}>
        <p className="sc-member-bubble">{conversation.message}</p>
        {(messages[conversation.id] || []).map((message, index) => <p key={index} className="sc-member-bubble sc-member-bubble-sent">{message}</p>)}
      </div>
      <form className="sc-member-reply" onSubmit={event => { event.preventDefault(); const text = draft.trim(); if (!text) return; setMessages(items => ({ ...items, [conversation.id]: [...(items[conversation.id] || []), text] })); setDraft(''); input.current?.focus(); notify('Reply added to demo — nothing sent.'); }}>
        <input ref={input} aria-label="Demo message" placeholder="Write a reply…" value={draft} maxLength={240} onChange={event => setDraft(event.target.value)} />
        <button type="submit" aria-label="Add reply to demo conversation" disabled={!draft.trim()}><HugeiconsIcon icon={SentIcon} /></button>
      </form>
    </> : <>
      <header className="sc-member-chat-heading"><div><h3>{compose ? 'Start a conversation' : 'Conversations'}</h3><p>{compose ? 'Choose someone from your community' : 'A little hello goes a long way'}</p></div><button type="button" className="sc-member-mini-action" aria-label={compose ? 'Cancel new conversation' : 'New conversation'} aria-pressed={compose} onClick={() => setCompose(!compose)}><HugeiconsIcon icon={compose ? Cancel01Icon : Edit02Icon} /></button></header>
      <div className="sc-member-chat-list">
        {conversations.filter(item => !compose || item.id !== 'group').map(item => <button type="button" className={`sc-member-conversation ${item.id === 'group' ? 'sc-member-conversation-group' : ''}`} key={item.id} onClick={() => open(item.id)}>
          {item.image ? <Image src={item.image} alt="" className="sc-member-chat-avatar" /> : <span className="sc-member-chat-avatar sc-member-group-avatar"><HugeiconsIcon icon={UserGroupIcon} /></span>}
          <span className="sc-member-conversation-copy"><strong>{item.name}</strong><small>{compose ? 'Open a demo conversation' : messages[item.id]?.at(-1) || item.preview}</small></span>
          <span className="sc-member-conversation-meta"><small>{item.time}</small>{item.unread > 0 && !read.includes(item.id) && <span className={item.id === 'group' ? 'sc-member-unread-count' : 'sc-member-unread-dot'} aria-label={`${item.unread} unread messages`}>{item.id === 'group' ? item.unread : null}</span>}</span>
        </button>)}
      </div>
    </>}
  </section>;
}

const initialTasks = [
  { id: 1, title: 'Welcome new members', done: true, due: 'Today' },
  { id: 2, title: 'Review course progress', done: false, due: 'Today' },
  { id: 3, title: 'Plan the next session', done: false, due: 'Today' },
  { id: 4, title: 'Share weekly highlights', done: false, due: 'Tomorrow' },
  { id: 5, title: 'Prepare lesson resources', done: true, due: 'Today' },
  { id: 6, title: 'Update the reading list', done: true, due: 'Today' },
  { id: 7, title: 'Reply to introductions', done: true, due: 'Today' },
  { id: 8, title: 'Review design exercises', done: true, due: 'Today' },
  { id: 9, title: 'Publish session recording', done: true, due: 'Today' },
  { id: 10, title: 'Organize shared files', done: true, due: 'Today' },
  { id: 11, title: 'Send weekly recap', done: true, due: 'Today' },
  { id: 12, title: 'Outline next week’s goals', done: false, due: 'Tomorrow' },
];

export function MembershipTasks() {
  const notify = usePreviewToast();
  const [tasks, setTasks] = useState(initialTasks);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const id = useId().replace(/:/g, '');
  const completed = tasks.filter(task => task.done).length;
  const percent = Math.round(completed / tasks.length * 100);
  return <section className="sc-member-panel sc-member-tasks" aria-label="Community tasks">
    <header className="sc-member-task-summary">
      <svg viewBox="0 0 100 100" className="sc-member-task-ring" role="img" aria-label={`${percent} percent complete`}>
        <defs><linearGradient id={`${id}-progress`}><stop stopColor="#f853b7" /><stop offset="1" stopColor="#874cff" /></linearGradient></defs>
        <circle cx="50" cy="50" r="40" className="sc-member-ring-track" />
        <circle cx="50" cy="50" r="40" className="sc-member-ring-progress" pathLength="100" stroke={`url(#${id}-progress)`} strokeDasharray={`${percent} 100`} />
        <text x="50" y="57" textAnchor="middle">{percent}%</text>
      </svg>
      <div className="sc-member-task-numbers"><div><h3 aria-live="polite">{completed} / {tasks.length}</h3><button type="button" className="sc-member-mini-action" aria-label={adding ? 'Cancel new task' : 'Add a task'} aria-expanded={adding} onClick={() => setAdding(!adding)}><HugeiconsIcon icon={adding ? Cancel01Icon : Add01Icon} /></button></div><p>Tasks completed</p><progress value={completed} max={tasks.length} aria-label="Completed tasks" /></div>
    </header>
    {adding && <form className="sc-member-task-form" onSubmit={event => { event.preventDefault(); if (!draft.trim()) return; setTasks(items => [{ id: Math.max(...items.map(item => item.id)) + 1, title: draft.trim(), done: false, due: 'Today' }, ...items]); setDraft(''); setAdding(false); notify('Task added.'); }}><input aria-label="New task title" autoFocus placeholder="What’s next?" maxLength={65} value={draft} onChange={event => setDraft(event.target.value)} /><button type="submit" disabled={!draft.trim()}>Add</button></form>}
    <div className="sc-member-task-list" tabIndex={0} role="group" aria-label="Task checklist, scroll for all tasks">
      {tasks.map(task => <label className={`sc-member-task-row ${task.done ? 'sc-member-task-done' : ''}`} key={task.id}>
        <input type="checkbox" checked={task.done} onChange={() => { setTasks(items => items.map(item => item.id === task.id ? { ...item, done: !item.done } : item)); notify(task.done ? 'Task marked incomplete.' : 'Task completed.'); }} />
        <span className="sc-member-task-check" aria-hidden="true">{task.done && <HugeiconsIcon icon={Tick02Icon} />}</span>
        <span className="sc-member-task-title">{task.title}</span>
        <span className={`sc-member-task-due ${task.due === 'Tomorrow' ? 'sc-member-task-tomorrow' : ''}`} title={task.done ? 'Complete' : task.due}><HugeiconsIcon icon={task.done ? Tick02Icon : Calendar03Icon} aria-hidden="true" /><span className="sc-screen-reader">{task.done ? 'Complete' : task.due}</span></span>
      </label>)}
    </div>
  </section>;
}
