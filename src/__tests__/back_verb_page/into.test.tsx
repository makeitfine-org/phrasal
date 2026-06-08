import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "into" section definitions', () => {
  it('renders definition for accidentally reversing into something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To drive a vehicle backwards and accidentally hit something/i)).toBeInTheDocument();
  });

  it('renders definition for getting into something by chance', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get into a career or situation by chance/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To drive a vehicle backwards and accidentally hit something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To get into a career or situation by chance/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To drive a vehicle backwards and accidentally hit something/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backwards and accidentally hit something.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'backInto_section_expanded', /To drive a vehicle backwards and accidentally hit something/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'backInto', /To drive a vehicle backwards and accidentally hit something/i, /I accidentally backed into the CEO's car/i, renderPage, getCard);
