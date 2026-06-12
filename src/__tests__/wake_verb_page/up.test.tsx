import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

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
