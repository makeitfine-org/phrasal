import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "in" section definitions', () => {
  it('renders definition for storing a large supply', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collect and store a large supply of something for future use\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collect and store a large supply of something for future use\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collect and store a large supply of something for future use\./i)).toHaveAttribute(
      'title',
      'To collect and store a large supply of something for future use.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'layIn_section_expanded', /To collect and store a large supply of something for future use\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'layIn', /To collect and store a large supply of something for future use\./i, /We need to lay in plenty of coffee before the development team starts the big sprint\./i, renderPage, getCard);
