import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "into" section definitions', () => {
  it('renders definition for translating a text into another language', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To translate a piece of text into another language/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To translate a piece of text into another language/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To translate a piece of text into another language/i)).toHaveAttribute(
      'title',
      'To translate a piece of text into another language (formal and slightly old-fashioned).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'doInto_section_expanded', /To translate a piece of text into another language/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'doInto', /To translate a piece of text into another language/i, /done into English by a famous scholar/i, renderPage, getCard);
