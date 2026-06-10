import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "back" section definitions', () => {
  it('renders definition for hesitating to act or speak', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate to act or speak\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping something from moving forward', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stop something from moving forward, developing, or succeeding\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping information secret', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To keep information a secret\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate to act or speak\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate to act or speak\./i)).toHaveAttribute(
      'title',
      'To hesitate to act or speak.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'holdBack_section_expanded', /To hesitate to act or speak\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'holdBack', /To hesitate to act or speak\./i, /We need all your ideas for this project, so please do not hold back in the meeting\./i, renderPage, getCard);
