import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, ExpandAllIcon, CollapseAllIcon } from '../components/Icons';
import ListSearchModal from '../components/ListSearchModal';
import type { ListSearchEntry } from '../data/listVerbIndex';

const PARTICLE_NAMES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against', 'along',
];

const GET_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'by', 'together', 'with', 'over', 'ahead', 'after',
  'behind', 'through', 'about / around', 'to',
];

const MAKE_PARTICLES = [
  'after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with',
];

const PUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across / over',
  'forward', 'back', 'by', 'together', 'with', 'ahead', 'behind', 'through',
  'about / around / round', 'to',
];

const GIVE_PARTICLES = [
  'away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with',
];

const GO_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

const COME_PARTICLES = [
  'about', 'across', 'after', 'against', 'ahead', 'apart', 'around / round',
  'away', 'back', 'behind', 'by', 'down', 'for', 'forward', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with', 'without',
];

const TAKE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

const ACT_PARTICLES = ['on / upon', 'up', 'out', 'for', 'against'];

const CUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'back', 'together', 'apart', 'over', 'ahead', 'through', 'about / round', 'to', 'against',
];

const ASK_PARTICLES = [
  'about', 'after', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'out', 'over', 'up',
];

const BACK_PARTICLES = [
  'away', 'down', 'in', 'into', 'off', 'onto', 'out / out of', 'over', 'up',
];

const BE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

const BREAK_PARTICLES = [
  'off', 'up', 'down', 'in', 'into', 'out', 'away', 'back', 'for',
  'with', 'apart', 'over', 'through', 'to', 'against',
];

const BRING_PARTICLES = [
  'about', 'around / round', 'away', 'back', 'by', 'down', 'forward',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up',
];

const BLOW_PARTICLES = [
  'about / around (round)', 'apart', 'away', 'back', 'by', 'down', 'in',
  'into', 'off', 'out', 'over', 'through', 'up',
];

const BRUSH_PARTICLES = [
  'off', 'up / up on', 'away', 'down', 'out', 'on', 'over', 'against', 'by', 'back', 'through',
];

const BUILD_PARTICLES = ['around / round', 'in / into', 'on', 'out', 'up', 'to'];

const CALL_PARTICLES = [
  'off', 'on / upon', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'over', 'ahead', 'after',
  'through', 'about', 'around / round', 'to',
];

const CAST_PARTICLES = [
  'about / around / round', 'away', 'back', 'down', 'forward', 'off', 'on', 'out', 'up',
];

const CARRY_PARTICLES = [
  'about / around / round', 'away', 'back', 'forward', 'off', 'on', 'out', 'over', 'through',
];

const CATCH_PARTICLES = ['in', 'on', 'out', 'up'];

const CHECK_PARTICLES = [
  'against', 'around / round', 'back', 'down', 'for', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'up', 'with',
];

const CHEER_PARTICLES = ['against', 'for', 'off', 'on', 'up'];

const CLEAN_PARTICLES = ['around', 'away', 'down', 'off', 'out', 'up', 'up after'];

const COUNT_PARTICLES = ['against', 'back', 'down', 'for', 'in', 'off', 'on', 'out', 'up'];

const DEAL_PARTICLES = ['around / round', 'away', 'by', 'in', 'into', 'out', 'to', 'with'];

const DO_PARTICLES = [
  'about', 'away', 'by', 'down', 'for', 'in', 'into', 'out', 'over', 'to', 'up', 'with', 'without',
];

const DRESS_PARTICLES = ['back', 'by', 'down', 'off', 'on', 'out', 'up'];

const DROP_PARTICLES = [
  'across', 'around / round', 'away', 'back', 'behind', 'by', 'down',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to',
];

const EAT_PARTICLES = [
  'up', 'into', 'away', 'out', 'in', 'through', 'around / round', 'on', 'down', 'off',
];

const FALL_PARTICLES = [
  'about / around / round', 'apart', 'away', 'back', 'behind', 'down',
  'for', 'in', 'into', 'off', 'on / upon', 'out', 'over', 'through', 'to',
];

const FIGURE_PARTICLES = ['for', 'in', 'into', 'on', 'out', 'up'];

const FILL_PARTICLES = ['down', 'in', 'out', 'up', 'with'];

const FIND_PARTICLES = ['out', 'for', 'against'];

const GROW_PARTICLES = ['apart', 'away', 'back', 'in', 'into', 'on', 'out / out of', 'over', 'to', 'together', 'up', 'with'];

const HAND_PARTICLES = ['back', 'down', 'in', 'off', 'on', 'out', 'over', 'around / round / about', 'to'];

const HANG_PARTICLES = ['about / around / round', 'back', 'behind', 'down', 'in', 'off', 'on', 'out', 'over', 'together', 'up', 'with'];

const HOLD_PARTICLES = ['against', 'back', 'down', 'in', 'off', 'on', 'out', 'over', 'to', 'together', 'up', 'with'];

const KEEP_PARTICLES = ['about / around / round', 'across', 'after', 'ahead', 'apart', 'away', 'back', 'behind', 'down', 'in', 'off', 'on', 'out', 'to', 'together', 'up'];

const KNOCK_PARTICLES = ['about / around / round', 'against', 'apart', 'back', 'down', 'in', 'into', 'off', 'on', 'out', 'over', 'through', 'together', 'up'];

const LAY_PARTICLES = ['about', 'away', 'by', 'down', 'for', 'in', 'into', 'off', 'on', 'out', 'over', 'to', 'up'];

const LEAVE_PARTICLES = ['about / around', 'back', 'behind', 'for', 'in', 'off', 'on', 'out', 'over', 'to', 'up (to)', 'with'];

const LET_PARTICLES = ['down', 'in', 'into', 'off', 'on', 'out', 'up', 'by', 'through'];

const LOG_PARTICLES = ['in / into', 'out', 'on', 'off', 'up'];

const LOOK_PARTICLES = [
  'after', 'ahead', 'around / round / about', 'away', 'back (on)', 'down on',
  'for', 'forward to', 'in (on)', 'into', 'on', 'out', 'over', 'through', 'to', 'up',
];

const MIX_PARTICLES = ['up', 'in / into', 'with', 'together', 'down'];

const PASS_PARTICLES = [
  'away', 'by', 'down', 'for', 'in', 'into', 'off', 'on', 'out',
  'over', 'through', 'to', 'up', 'around / round / about',
];

const PAY_PARTICLES = [
  'off', 'up', 'down', 'in / into', 'out', 'away', 'forward', 'back', 'for', 'over',
];

const PICK_PARTICLES = [
  'apart', 'away', 'off', 'on', 'out', 'over', 'through', 'up',
];

const POINT_PARTICLES = [
  'ahead / forward', 'back', 'off', 'out', 'to', 'up',
];

const PULL_PARTICLES = [
  'about', 'ahead', 'against', 'apart', 'around / round', 'away', 'back',
  'down', 'for', 'forward', 'in', 'into', 'off', 'on', 'out', 'over',
  'through', 'to', 'together', 'up',
];

const RUN_PARTICLES = [
  'about / around / round', 'across', 'after', 'against', 'ahead', 'away', 'back',
  'behind', 'by', 'down', 'for', 'in', 'into', 'off', 'on', 'out', 'over',
  'through', 'to', 'together', 'up', 'with', 'without',
];

const SET_PARTICLES = [
  'about', 'against', 'ahead', 'apart', 'back', 'by', 'down', 'in', 'off', 'on', 'out', 'over', 'to', 'up',
];

const SETTLE_PARTICLES = [
  'back', 'down', 'for', 'in', 'into', 'on', 'out', 'over', 'to', 'up', 'with',
];

const SHOW_PARTICLES = [
  'around / round / about', 'down', 'for', 'in / into', 'off', 'out', 'over', 'through', 'to', 'up',
];

const SHUT_PARTICLES = [
  'away', 'down', 'in', 'off', 'out', 'up',
];

const SIT_PARTICLES = [
  'about / around / round', 'back', 'by', 'down', 'for', 'in', 'on', 'out', 'over', 'through', 'up', 'with',
];

const STAND_PARTICLES = [
  'about / around', 'against', 'apart', 'away', 'back', 'behind', 'by', 'down', 'for', 'in', 'into',
  'off', 'on', 'out', 'over', 'to', 'together', 'up', 'with',
];

const STICK_PARTICLES = [
  'about / around', 'away', 'by', 'down', 'for', 'in', 'out', 'to', 'together', 'up', 'with',
];

const TALK_PARTICLES = [
  'about', 'across', 'against', 'around / round', 'away', 'back', 'down', 'for', 'into', 'on',
  'out', 'over', 'through', 'to', 'together', 'up', 'with',
];

const THINK_PARTICLES = [
  'about', 'ahead', 'around / round', 'back', 'for', 'on', 'out', 'over', 'through', 'to', 'up',
];

const THROW_PARTICLES = [
  'about / around / round', 'away', 'back', 'down', 'in', 'into', 'off', 'on', 'out', 'over', 'together', 'up',
];

const TRY_PARTICLES = [
  'back', 'for', 'on', 'out', 'out for', 'over',
];

const TURN_PARTICLES = [
  'about', 'against', 'around / round', 'away', 'back', 'down',
  'in', 'into', 'off', 'on', 'out', 'over', 'to', 'up',
];

const USE_PARTICLES = ['against', 'to / used to', 'up'];

const WAKE_PARTICLES = ['to', 'up', 'up to'];

const WARM_PARTICLES = ['down', 'over', 'through', 'to', 'up'];

const WATCH_PARTICLES = ['back', 'for', 'on', 'out', 'out for', 'over', 'through'];

const WEAR_PARTICLES = ['away', 'down', 'in', 'off', 'on', 'out', 'through'];

const WORK_PARTICLES = [
  'against', 'ahead', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with',
];

const WRITE_PARTICLES = [
  'about', 'against', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'up',
];

const ZIP_PARTICLES = [
  'about / around / round', 'across', 'ahead', 'apart', 'away', 'back', 'by',
  'down', 'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up',
];

const VERBS = [
  { key: 'act',    label: 'Act',    to: '/phrasal-verbs/list/act',    particles: ACT_PARTICLES },
  { key: 'ask',    label: 'Ask',    to: '/phrasal-verbs/list/ask',    particles: ASK_PARTICLES },
  { key: 'back',   label: 'Back',   to: '/phrasal-verbs/list/back',   particles: BACK_PARTICLES },
  { key: 'be',     label: 'Be',     to: '/phrasal-verbs/list/be',     particles: BE_PARTICLES },
  { key: 'blow',   label: 'Blow',   to: '/phrasal-verbs/list/blow',   particles: BLOW_PARTICLES },
  { key: 'break',  label: 'Break',  to: '/phrasal-verbs/list/break',  particles: BREAK_PARTICLES },
  { key: 'bring',  label: 'Bring',  to: '/phrasal-verbs/list/bring',  particles: BRING_PARTICLES },
  { key: 'brush',  label: 'Brush',  to: '/phrasal-verbs/list/brush',  particles: BRUSH_PARTICLES },
  { key: 'build',  label: 'Build',  to: '/phrasal-verbs/list/build',  particles: BUILD_PARTICLES },
  { key: 'call',   label: 'Call',   to: '/phrasal-verbs/list/call',   particles: CALL_PARTICLES },
  { key: 'carry',  label: 'Carry',  to: '/phrasal-verbs/list/carry',  particles: CARRY_PARTICLES },
  { key: 'cast',   label: 'Cast',   to: '/phrasal-verbs/list/cast',   particles: CAST_PARTICLES },
  { key: 'catch',  label: 'Catch',  to: '/phrasal-verbs/list/catch',  particles: CATCH_PARTICLES },
  { key: 'check',  label: 'Check',  to: '/phrasal-verbs/list/check',  particles: CHECK_PARTICLES },
  { key: 'cheer',  label: 'Cheer',  to: '/phrasal-verbs/list/cheer',  particles: CHEER_PARTICLES },
  { key: 'clean',  label: 'Clean',  to: '/phrasal-verbs/list/clean',  particles: CLEAN_PARTICLES },
  { key: 'come',   label: 'Come',   to: '/phrasal-verbs/list/come',   particles: COME_PARTICLES },
  { key: 'count',  label: 'Count',  to: '/phrasal-verbs/list/count',  particles: COUNT_PARTICLES },
  { key: 'cut',    label: 'Cut',    to: '/phrasal-verbs/list/cut',    particles: CUT_PARTICLES },
  { key: 'deal',   label: 'Deal',   to: '/phrasal-verbs/list/deal',   particles: DEAL_PARTICLES },
  { key: 'do',     label: 'Do',     to: '/phrasal-verbs/list/do',     particles: DO_PARTICLES },
  { key: 'dress',  label: 'Dress',  to: '/phrasal-verbs/list/dress',  particles: DRESS_PARTICLES },
  { key: 'drop',   label: 'Drop',   to: '/phrasal-verbs/list/drop',   particles: DROP_PARTICLES },
  { key: 'eat',    label: 'Eat',    to: '/phrasal-verbs/list/eat',    particles: EAT_PARTICLES },
  { key: 'fall',   label: 'Fall',   to: '/phrasal-verbs/list/fall',   particles: FALL_PARTICLES },
  { key: 'figure', label: 'Figure', to: '/phrasal-verbs/list/figure', particles: FIGURE_PARTICLES },
  { key: 'fill',   label: 'Fill',   to: '/phrasal-verbs/list/fill',   particles: FILL_PARTICLES },
  { key: 'find',   label: 'Find',   to: '/phrasal-verbs/list/find',   particles: FIND_PARTICLES },
  { key: 'get',    label: 'Get',    to: '/phrasal-verbs/list/get',    particles: GET_PARTICLES },
  { key: 'give',   label: 'Give',   to: '/phrasal-verbs/list/give',   particles: GIVE_PARTICLES },
  { key: 'go',     label: 'Go',     to: '/phrasal-verbs/list/go',     particles: GO_PARTICLES },
  { key: 'grow',   label: 'Grow',   to: '/phrasal-verbs/list/grow',   particles: GROW_PARTICLES },
  { key: 'hand',   label: 'Hand',   to: '/phrasal-verbs/list/hand',   particles: HAND_PARTICLES },
  { key: 'hang',   label: 'Hang',   to: '/phrasal-verbs/list/hang',   particles: HANG_PARTICLES },
  { key: 'hold',   label: 'Hold',   to: '/phrasal-verbs/list/hold',   particles: HOLD_PARTICLES },
  { key: 'keep',   label: 'Keep',   to: '/phrasal-verbs/list/keep',   particles: KEEP_PARTICLES },
  { key: 'knock',  label: 'Knock',  to: '/phrasal-verbs/list/knock',  particles: KNOCK_PARTICLES },
  { key: 'lay',    label: 'Lay',    to: '/phrasal-verbs/list/lay',    particles: LAY_PARTICLES },
  { key: 'leave',  label: 'Leave',  to: '/phrasal-verbs/list/leave',  particles: LEAVE_PARTICLES },
  { key: 'let',    label: 'Let',    to: '/phrasal-verbs/list/let',    particles: LET_PARTICLES },
  { key: 'log',    label: 'Log',    to: '/phrasal-verbs/list/log',    particles: LOG_PARTICLES },
  { key: 'look',   label: 'Look',   to: '/phrasal-verbs/list/look',   particles: LOOK_PARTICLES },
  { key: 'make',   label: 'Make',   to: '/phrasal-verbs/list/make',   particles: MAKE_PARTICLES },
  { key: 'mix',    label: 'Mix',    to: '/phrasal-verbs/list/mix',    particles: MIX_PARTICLES },
  { key: 'pass',   label: 'Pass',   to: '/phrasal-verbs/list/pass',   particles: PASS_PARTICLES },
  { key: 'pay',    label: 'Pay',    to: '/phrasal-verbs/list/pay',    particles: PAY_PARTICLES },
  { key: 'pick',   label: 'Pick',   to: '/phrasal-verbs/list/pick',   particles: PICK_PARTICLES },
  { key: 'point',  label: 'Point',  to: '/phrasal-verbs/list/point',  particles: POINT_PARTICLES },
  { key: 'pull',   label: 'Pull',   to: '/phrasal-verbs/list/pull',   particles: PULL_PARTICLES },
  { key: 'put',    label: 'Put',    to: '/phrasal-verbs/list/put',    particles: PUT_PARTICLES },
  { key: 'run',    label: 'Run',    to: '/phrasal-verbs/list/run',    particles: RUN_PARTICLES },
  { key: 'set',    label: 'Set',    to: '/phrasal-verbs/list/set',    particles: SET_PARTICLES },
  { key: 'settle', label: 'Settle', to: '/phrasal-verbs/list/settle', particles: SETTLE_PARTICLES },
  { key: 'show',   label: 'Show',   to: '/phrasal-verbs/list/show',   particles: SHOW_PARTICLES },
  { key: 'shut',   label: 'Shut',   to: '/phrasal-verbs/list/shut',   particles: SHUT_PARTICLES },
  { key: 'sit',    label: 'Sit',    to: '/phrasal-verbs/list/sit',    particles: SIT_PARTICLES },
  { key: 'stand',  label: 'Stand',  to: '/phrasal-verbs/list/stand',  particles: STAND_PARTICLES },
  { key: 'stick',  label: 'Stick',  to: '/phrasal-verbs/list/stick',  particles: STICK_PARTICLES },
  { key: 'take',   label: 'Take',   to: '/phrasal-verbs/list/take',   particles: TAKE_PARTICLES },
  { key: 'talk',   label: 'Talk',   to: '/phrasal-verbs/list/talk',   particles: TALK_PARTICLES },
  { key: 'think',  label: 'Think',  to: '/phrasal-verbs/list/think',  particles: THINK_PARTICLES },
  { key: 'throw',  label: 'Throw',  to: '/phrasal-verbs/list/throw',  particles: THROW_PARTICLES },
  { key: 'try',    label: 'Try',    to: '/phrasal-verbs/list/try',    particles: TRY_PARTICLES },
  { key: 'turn',   label: 'Turn',   to: '/phrasal-verbs/list/turn',   particles: TURN_PARTICLES },
  { key: 'use',    label: 'Use',    to: '/phrasal-verbs/list/use',    particles: USE_PARTICLES },
  { key: 'wake',   label: 'Wake',   to: '/phrasal-verbs/list/wake',   particles: WAKE_PARTICLES },
  { key: 'warm',   label: 'Warm',   to: '/phrasal-verbs/list/warm',   particles: WARM_PARTICLES },
  { key: 'watch',  label: 'Watch',  to: '/phrasal-verbs/list/watch',  particles: WATCH_PARTICLES },
  { key: 'wear',   label: 'Wear',   to: '/phrasal-verbs/list/wear',   particles: WEAR_PARTICLES },
  { key: 'work',   label: 'Work',   to: '/phrasal-verbs/list/work',   particles: WORK_PARTICLES },
  { key: 'write',  label: 'Write',  to: '/phrasal-verbs/list/write',  particles: WRITE_PARTICLES },
  { key: 'zip',    label: 'Zip',    to: '/phrasal-verbs/list/zip',    particles: ZIP_PARTICLES },
];

const EXPANDED_KEY = 'verbListExpanded';
const ALL_KEYS = ['particles', ...VERBS.map(v => v.key)];

function loadExpanded(): Set<string> {
  try {
    const saved = localStorage.getItem(EXPANDED_KEY);
    return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export default function PhrasalVerbsListPage() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(loadExpanded);
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  const allExpanded = ALL_KEYS.every(k => expanded.has(k));

  const toggleAll = () => {
    if (allExpanded) {
      setExpanded(new Set());
      localStorage.setItem(EXPANDED_KEY, JSON.stringify([]));
    } else {
      setExpanded(new Set(ALL_KEYS));
      localStorage.setItem(EXPANDED_KEY, JSON.stringify(ALL_KEYS));
    }
  };

  const toggleExpanded = (key: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(EXPANDED_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const handleCopy = (e: React.MouseEvent, label: string, particles: string[]) => {
    e.preventDefault();
    e.stopPropagation();
    const text = particles.map(p => `${label.toLowerCase()} ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedVerb(label);
      setTimeout(() => setCopiedVerb(null), 1500);
    });
  };

  const particleNamesText = PARTICLE_NAMES.join(', ');

  const handleSearchSelect = (entry: ListSearchEntry) => {
    localStorage.setItem(entry.storageKey, 'true');
    navigate(entry.route, { state: { scrollTo: entry.sectionId } });
  };

  const portalTarget = document.getElementById('verb-page-actions');

  return (
    <>
      {portalTarget && ReactDOM.createPortal(
        <button
          onClick={toggleAll}
          title={allExpanded ? 'Collapse all' : 'Expand all'}
          className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300"
        >
          {allExpanded ? <ExpandAllIcon /> : <CollapseAllIcon />}
        </button>,
        portalTarget
      )}
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Phrasal Verbs List
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">
        Browse definitions and examples by verb
      </p>
      <div className="w-full max-w-sm mb-6 flex justify-end">
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          title="Search phrasal verbs"
          aria-label="Search phrasal verbs"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div
          data-testid="verb-card-particles"
          onClick={() => navigate('/phrasal-verbs/particles')}
          className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
        >
          <div className="flex items-center justify-between">
            <Link
              to="/phrasal-verbs/particles"
              onClick={e => e.stopPropagation()}
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              <h2>Particles</h2>
            </Link>
            <button
              data-testid="toggle-card-particles"
              onClick={e => { e.stopPropagation(); toggleExpanded('particles'); }}
              className="flex items-center p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={expanded.has('particles') ? 'Collapse Particles' : 'Expand Particles'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 transition-transform duration-200 ${expanded.has('particles') ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {expanded.has('particles') && (
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-2"
              title={particleNamesText}
            >
              {particleNamesText}
            </p>
          )}
        </div>
        <hr className="border-gray-600 dark:border-gray-500" />
        {VERBS.map(({ key, label, to, particles }) => {
          const isExpanded = expanded.has(key);
          const isCopied = copiedVerb === label;
          return (
            <div
              key={key}
              data-testid={`verb-card-${key}`}
              onClick={() => navigate(to)}
              className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between">
                <Link
                  to={to}
                  onClick={e => e.stopPropagation()}
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  <h2>{label}</h2>
                </Link>
                <div className="flex items-center gap-1">
                  {isExpanded && (
                    <button
                      onClick={e => handleCopy(e, label, particles)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title={isCopied ? 'Copied!' : `Copy all "${label.toLowerCase()}" phrasal verbs`}
                    >
                      {isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                  )}
                  <button
                    data-testid={`toggle-card-${key}`}
                    onClick={e => { e.stopPropagation(); toggleExpanded(key); }}
                    className="flex items-center p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              {isExpanded && (
                <p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-2"
                  title={particles.join(', ')}
                >
                  {particles.join(', ')}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {showSearch && (
        <ListSearchModal
          onSelect={handleSearchSelect}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
    </>
  );
}
