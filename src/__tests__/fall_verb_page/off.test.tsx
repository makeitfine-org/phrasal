import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "off" section definitions', () => {
  it('renders definition for decreasing in quantity or frequency', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in quantity, quality, or frequency\./i)).toBeInTheDocument();
  });

  it('renders definition for detaching from something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach from something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in quantity, quality, or frequency\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in quantity, quality, or frequency\./i)).toHaveAttribute(
      'title',
      'To decrease in quantity, quality, or frequency.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'fallOff_section_expanded', /To decrease in quantity, quality, or frequency\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'fallOff', /To decrease in quantity, quality, or frequency\./i, /Product sales usually fall off during the summer holidays\./i, renderPage, getCard);
