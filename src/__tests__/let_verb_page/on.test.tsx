import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "on" section definitions', () => {
  it('renders definition for revealing a secret', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To reveal a secret or show that you know something/i)).toBeInTheDocument();
  });

  it('renders definition for pretending', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To pretend/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To reveal a secret or show that you know something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To reveal a secret or show that you know something/i)).toHaveAttribute(
      'title',
      'To reveal a secret or show that you know something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'letOn_section_expanded', /To reveal a secret or show that you know something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'letOn', /To reveal a secret or show that you know something/i, /We are planning a surprise party, so please don't let on\./i, renderPage, getCard);
