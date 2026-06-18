import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'WakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- to ---

describe('WakeVerbPage — "to" section definitions', () => {
  it('renders definition for waking to a condition', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming aware (literary)', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become aware of a fact or responsibility \(literary\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i),
      screen.getByText(/To become aware of a fact or responsibility \(literary\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i)).toHaveAttribute(
      'title',
      'To stop sleeping and immediately find a specific condition, sound, or situation greeting you.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become aware of a fact or responsibility \(literary\)\./i)).toHaveAttribute(
      'title',
      'To become aware of a fact or responsibility (literary).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'wakeTo_section_expanded', /To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'wakeTo', /To stop sleeping and immediately find a specific condition, sound, or situation greeting you\./i, /We woke to the sound of birds singing outside the window\./i, renderPage, getCard);

// --- up ---

describe('WakeVerbPage — "up" section definitions', () => {
  it('renders definition for transitioning from sleep', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To transition naturally from sleep to an awake state\./i)).toBeInTheDocument();
  });

  it('renders definition for rousing another person', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rouse another person, animal, or system from sleep\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping inattentiveness', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop being inattentive or oblivious and start paying attention to responsibilities\./i)).toBeInTheDocument();
  });

  it('renders definition for injecting energy into an event', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To inject energy, excitement, or activity into a dull environment or event\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To transition naturally from sleep to an awake state\./i),
      screen.getByText(/To rouse another person, animal, or system from sleep\./i),
      screen.getByText(/To stop being inattentive or oblivious and start paying attention to responsibilities\./i),
      screen.getByText(/To inject energy, excitement, or activity into a dull environment or event\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To transition naturally from sleep to an awake state\./i)).toHaveAttribute(
      'title',
      'To transition naturally from sleep to an awake state.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rouse another person, animal, or system from sleep\./i)).toHaveAttribute(
      'title',
      'To rouse another person, animal, or system from sleep.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop being inattentive or oblivious and start paying attention to responsibilities\./i)).toHaveAttribute(
      'title',
      'To stop being inattentive or oblivious and start paying attention to responsibilities.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To inject energy, excitement, or activity into a dull environment or event\./i)).toHaveAttribute(
      'title',
      'To inject energy, excitement, or activity into a dull environment or event.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'wakeUp_section_expanded', /To transition naturally from sleep to an awake state\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'wakeUp', /To transition naturally from sleep to an awake state\./i, /I usually wake up at 6:30 AM without an alarm\./i, renderPage, getCard);

// --- up_to ---

describe('WakeVerbPage — "up to" section definitions', () => {
  it('renders definition for finally realizing a danger', () => {
    renderPage();
    expandSection('up to');
    expect(screen.getByText(/To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up to');
    const def = screen.getByText(/To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up to');
    expect(screen.getByText(/To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i)).toHaveAttribute(
      'title',
      'To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice.'
    );
  });
});

describeSectionToggle(LABEL, 'up to', 'wakeUpTo_section_expanded', /To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i, renderPage);

describeChevronAndColour(LABEL, 'up to', renderPage);

describeDefaultImageCards(LABEL, 'up to', 'wakeUpTo', /To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice\./i, /The company's board needs to wake up to the fact that their competitors are innovating faster\./i, renderPage, getCard);
