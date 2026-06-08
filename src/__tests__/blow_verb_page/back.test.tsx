import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "back" section definitions', () => {
  it('renders definition for wind pushing back', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/When the wind pushes something.*back toward you/i)).toBeInTheDocument();
  });

  it('renders definition for unexpected negative consequences', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To have unexpected negative consequences/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/When the wind pushes something.*back toward you/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/When the wind pushes something.*back toward you/i)).toHaveAttribute(
      'title',
      'When the wind pushes something (like smoke or hair) back toward you.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'blowBack_section_expanded', /When the wind pushes something.*back toward you/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'blowBack', /When the wind pushes something.*back toward you/i, /the smoke blew back into my face/i, renderPage, getCard);
