import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "up" section definitions', () => {
  it('renders definition for lifting something from a surface', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lift something from a surface/i)).toBeInTheDocument();
  });

  it('renders definition for collecting someone in a vehicle', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To collect someone in a vehicle/i)).toBeInTheDocument();
  });

  it('renders definition for learning a skill casually', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To learn a skill casually, without formal training/i)).toBeInTheDocument();
  });

  it('renders definition for improving or increasing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To improve or increase/i)).toBeInTheDocument();
  });

  it('renders definition for catching an illness', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To catch an illness/i)).toBeInTheDocument();
  });

  it('renders definition for resuming an activity', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To resume an activity/i)).toBeInTheDocument();
  });

  it('renders definition for paying a bill', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay a bill/i)).toBeInTheDocument();
  });

  it('renders definition for noticing or detecting something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To notice or detect something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lift something from a surface/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lift something from a surface/i)).toHaveAttribute(
      'title',
      'To lift something from a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'pickUp_section_expanded', /To lift something from a surface/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'pickUp', /To lift something from a surface/i, /Please pick up your clothes from the floor\./i, renderPage, getCard);
