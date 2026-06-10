import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "back" section definitions', () => {
  it('renders definition for returning money loaned', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return money to someone who loaned it to you/i)).toBeInTheDocument();
  });

  it('renders definition for revenge', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To do something bad to someone because they did something bad to you/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return money to someone who loaned it to you/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return money to someone who loaned it to you/i)).toHaveAttribute(
      'title',
      'To return money to someone who loaned it to you.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'payBack_section_expanded', /To return money to someone who loaned it to you/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'payBack', /To return money to someone who loaned it to you/i, /If you lend me \$20 for lunch, I will pay you back tomorrow\./i, renderPage, getCard);
