import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import PhrasalVerbsListPage from '../../pages/PhrasalVerbsListPage';

export function setupPortal() {
  let portalDiv: HTMLDivElement;

  beforeAll(() => {
    portalDiv = document.createElement('div');
    portalDiv.id = 'verb-page-actions';
    document.body.appendChild(portalDiv);
  });

  afterAll(() => {
    portalDiv.remove();
  });

  beforeEach(() => localStorage.clear());
}

export function renderPage() {
  return render(
    <MemoryRouter>
      <PhrasalVerbsListPage />
    </MemoryRouter>
  );
}

function LocationSpy() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname}</div>;
}

export function renderPageWithRoutes() {
  return render(
    <MemoryRouter initialEntries={['/phrasal-verbs/list']}>
      <Routes>
        <Route path="/phrasal-verbs/list" element={<><PhrasalVerbsListPage /><LocationSpy /></>} />
        <Route path="/phrasal-verbs/list/get" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/make" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/put" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/take" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/give" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/go" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/come" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/act" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/cut" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/break" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/bring" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/ask" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/back" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/be" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/blow" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/brush" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/build" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/call" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/carry" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/catch" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/check" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/cheer" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/clean" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/count" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/deal" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/do" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/dress" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/drop" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/eat" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/fall" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/figure" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/fill" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/find" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/grow" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/hand" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/hang" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/hold" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/keep" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/knock" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/lay" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/leave" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/let" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/log" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/look" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/mix" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/pass" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/pay" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/pick" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/point" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/pull" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/run" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/set" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/settle" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/show" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/shut" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/sit" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/stand" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/stick" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/talk" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/think" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/throw" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/try" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/turn" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/use" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/wake" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/warm" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/watch" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/wear" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/work" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/write" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/list/zip" element={<LocationSpy />} />
        <Route path="/phrasal-verbs/particles" element={<LocationSpy />} />
      </Routes>
    </MemoryRouter>
  );
}

export function expandCard(key: string) {
  fireEvent.click(screen.getByTestId(`toggle-card-${key}`));
}

export const ALL_ACT_PARTICLES = ['on / upon', 'up', 'out', 'for', 'against'];

export const ALL_ASK_PARTICLES = [
  'about', 'after', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'out', 'over', 'up',
];

export const ALL_BACK_PARTICLES = [
  'away', 'down', 'in', 'into', 'off', 'onto', 'out / out of', 'over', 'up',
];

export const ALL_BE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

export const ALL_BLOW_PARTICLES = [
  'about / around (round)', 'apart', 'away', 'back', 'by', 'down', 'in',
  'into', 'off', 'out', 'over', 'through', 'up',
];

export const ALL_BREAK_PARTICLES = [
  'off', 'up', 'down', 'in', 'into', 'out', 'away', 'back', 'for',
  'with', 'apart', 'over', 'through', 'to', 'against',
];

export const ALL_BRING_PARTICLES = [
  'about', 'around / round', 'away', 'back', 'by', 'down', 'forward',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up',
];

export const ALL_BRUSH_PARTICLES = [
  'off', 'up / up on', 'away', 'down', 'out', 'on', 'over', 'against', 'by', 'back', 'through',
];

export const ALL_BUILD_PARTICLES = ['around / round', 'in / into', 'on', 'out', 'up', 'to'];

export const ALL_CALL_PARTICLES = [
  'off', 'on / upon', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'over', 'ahead', 'after',
  'through', 'about', 'around / round', 'to',
];

export const ALL_CARRY_PARTICLES = [
  'about / around / round', 'away', 'back', 'forward', 'off', 'on', 'out', 'over', 'through',
];

export const ALL_CATCH_PARTICLES = ['in', 'on', 'out', 'up'];

export const ALL_CHECK_PARTICLES = [
  'against', 'around / round', 'back', 'down', 'for', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'up', 'with',
];

export const ALL_CHEER_PARTICLES = ['against', 'for', 'off', 'on', 'up'];

export const ALL_CLEAN_PARTICLES = ['around', 'away', 'down', 'off', 'out', 'up', 'up after'];

export const ALL_COME_PARTICLES = [
  'about', 'across', 'after', 'against', 'ahead', 'apart', 'around / round',
  'away', 'back', 'behind', 'by', 'down', 'for', 'forward', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with', 'without',
];

export const ALL_COUNT_PARTICLES = ['against', 'back', 'down', 'for', 'in', 'off', 'on', 'out', 'up'];

export const ALL_CUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'back', 'together', 'apart', 'over', 'ahead', 'through', 'about / round', 'to', 'against',
];

export const ALL_DEAL_PARTICLES = ['around / round', 'away', 'by', 'in', 'into', 'out', 'to', 'with'];

export const ALL_DO_PARTICLES = [
  'about', 'away', 'by', 'down', 'for', 'in', 'into', 'out', 'over', 'to', 'up', 'with', 'without',
];

export const ALL_DRESS_PARTICLES = ['back', 'by', 'down', 'off', 'on', 'out', 'up'];

export const ALL_DROP_PARTICLES = [
  'across', 'around / round', 'away', 'back', 'behind', 'by', 'down',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to',
];

export const ALL_EAT_PARTICLES = [
  'up', 'into', 'away', 'out', 'in', 'through', 'around / round', 'on', 'down', 'off',
];

export const ALL_FALL_PARTICLES = [
  'about / around / round', 'apart', 'away', 'back', 'behind', 'down',
  'for', 'in', 'into', 'off', 'on / upon', 'out', 'over', 'through', 'to',
];

export const ALL_FIGURE_PARTICLES = ['for', 'in', 'into', 'on', 'out', 'up'];

export const ALL_FILL_PARTICLES = ['down', 'in', 'out', 'up', 'with'];

export const ALL_FIND_PARTICLES = ['out', 'for', 'against'];

export const ALL_GIVE_PARTICLES = [
  'away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with',
];

export const ALL_GO_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

export const ALL_GROW_PARTICLES = ['apart', 'away', 'back', 'in', 'into', 'on', 'out / out of', 'over', 'to', 'together', 'up', 'with'];

export const ALL_HAND_PARTICLES = ['back', 'down', 'in', 'off', 'on', 'out', 'over', 'around / round / about', 'to'];

export const ALL_HANG_PARTICLES = ['about / around / round', 'back', 'behind', 'down', 'in', 'off', 'on', 'out', 'over', 'together', 'up', 'with'];

export const ALL_HOLD_PARTICLES = ['against', 'back', 'down', 'in', 'off', 'on', 'out', 'over', 'to', 'together', 'up', 'with'];

export const ALL_KEEP_PARTICLES = ['about / around / round', 'across', 'after', 'ahead', 'apart', 'away', 'back', 'behind', 'down', 'in', 'off', 'on', 'out', 'to', 'together', 'up'];

export const ALL_KNOCK_PARTICLES = ['about / around / round', 'against', 'apart', 'back', 'down', 'in', 'into', 'off', 'on', 'out', 'over', 'through', 'together', 'up'];

export const ALL_LAY_PARTICLES = ['about', 'away', 'by', 'down', 'for', 'in', 'into', 'off', 'on', 'out', 'over', 'to', 'up'];

export const ALL_LEAVE_PARTICLES = ['about / around', 'back', 'behind', 'for', 'in', 'off', 'on', 'out', 'over', 'to', 'up (to)', 'with'];

export const ALL_LET_PARTICLES = ['down', 'in', 'into', 'off', 'on', 'out', 'up', 'by', 'through'];

export const ALL_LOG_PARTICLES = ['in / into', 'out', 'on', 'off', 'up'];

export const ALL_LOOK_PARTICLES = [
  'after', 'ahead', 'around / round / about', 'away', 'back (on)', 'down on',
  'for', 'forward to', 'in (on)', 'into', 'on', 'out', 'over', 'through', 'to', 'up',
];

export const ALL_MAKE_PARTICLES = [
  'after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with',
];

export const ALL_MIX_PARTICLES = ['up', 'in / into', 'with', 'together', 'down'];

export const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'by', 'together', 'with', 'over', 'ahead', 'after',
  'behind', 'through', 'about / around', 'to',
];

export const ALL_PARTICLE_NAMES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against', 'along',
];

export const ALL_PASS_PARTICLES = [
  'away', 'by', 'down', 'for', 'in', 'into', 'off', 'on', 'out',
  'over', 'through', 'to', 'up', 'around / round / about',
];

export const ALL_PAY_PARTICLES = [
  'off', 'up', 'down', 'in / into', 'out', 'away', 'forward', 'back', 'for', 'over',
];

export const ALL_PICK_PARTICLES = [
  'apart', 'away', 'off', 'on', 'out', 'over', 'through', 'up',
];

export const ALL_POINT_PARTICLES = [
  'ahead / forward', 'back', 'off', 'out', 'to', 'up',
];

export const ALL_PULL_PARTICLES = [
  'about', 'ahead', 'against', 'apart', 'around / round', 'away', 'back',
  'down', 'for', 'forward', 'in', 'into', 'off', 'on', 'out', 'over',
  'through', 'to', 'together', 'up',
];

export const ALL_PUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across / over',
  'forward', 'back', 'by', 'together', 'with', 'ahead', 'behind', 'through',
  'about / around / round', 'to',
];

export const ALL_RUN_PARTICLES = [
  'about / around / round', 'across', 'after', 'against', 'ahead', 'away', 'back',
  'behind', 'by', 'down', 'for', 'in', 'into', 'off', 'on', 'out', 'over',
  'through', 'to', 'together', 'up', 'with', 'without',
];

export const ALL_SETTLE_PARTICLES = [
  'back', 'down', 'for', 'in', 'into', 'on', 'out', 'over', 'to', 'up', 'with',
];

export const ALL_SET_PARTICLES = [
  'about', 'against', 'ahead', 'apart', 'back', 'by', 'down', 'in', 'off', 'on', 'out', 'over', 'to', 'up',
];

export const ALL_SHOW_PARTICLES = [
  'around / round / about', 'down', 'for', 'in / into', 'off', 'out', 'over', 'through', 'to', 'up',
];

export const ALL_SHUT_PARTICLES = [
  'away', 'down', 'in', 'off', 'out', 'up',
];

export const ALL_SIT_PARTICLES = [
  'about / around / round', 'back', 'by', 'down', 'for', 'in', 'on', 'out', 'over', 'through', 'up', 'with',
];

export const ALL_STAND_PARTICLES = [
  'about / around', 'against', 'apart', 'away', 'back', 'behind', 'by', 'down', 'for', 'in', 'into',
  'off', 'on', 'out', 'over', 'to', 'together', 'up', 'with',
];

export const ALL_STICK_PARTICLES = [
  'about / around', 'away', 'by', 'down', 'for', 'in', 'out', 'to', 'together', 'up', 'with',
];

export const ALL_TAKE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

export const ALL_TALK_PARTICLES = [
  'about', 'across', 'against', 'around / round', 'away', 'back', 'down', 'for', 'into', 'on',
  'out', 'over', 'through', 'to', 'together', 'up', 'with',
];

export const ALL_THINK_PARTICLES = [
  'about', 'ahead', 'around / round', 'back', 'for', 'on', 'out', 'over', 'through', 'to', 'up',
];

export const ALL_THROW_PARTICLES = [
  'about / around / round', 'away', 'back', 'down', 'in', 'into', 'off', 'on', 'out', 'over', 'together', 'up',
];

export const ALL_TRY_PARTICLES = [
  'back', 'for', 'on', 'out', 'out for', 'over',
];

export const ALL_TURN_PARTICLES = [
  'about', 'against', 'around / round', 'away', 'back', 'down',
  'in', 'into', 'off', 'on', 'out', 'over', 'to', 'up',
];

export const ALL_USE_PARTICLES = ['against', 'to / used to', 'up'];

export const ALL_WAKE_PARTICLES = ['to', 'up', 'up to'];

export const ALL_WARM_PARTICLES = ['down', 'over', 'through', 'to', 'up'];

export const ALL_WATCH_PARTICLES = ['back', 'for', 'on', 'out', 'out for', 'over', 'through'];

export const ALL_WEAR_PARTICLES = ['away', 'down', 'in', 'off', 'on', 'out', 'through'];

export const ALL_WORK_PARTICLES = [
  'against', 'ahead', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with',
];

export const ALL_WRITE_PARTICLES = [
  'about', 'against', 'around / round', 'away', 'back', 'down', 'for',
  'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'up',
];

export const ALL_ZIP_PARTICLES = [
  'about / around / round', 'across', 'ahead', 'apart', 'away', 'back', 'by',
  'down', 'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up',
];

