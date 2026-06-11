import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "through" section definitions', () => {
  it('renders definition for carefully considering every step of a plan', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To carefully consider every step, detail, and possible result/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To carefully consider every step, detail, and possible result/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To carefully consider every step, detail, and possible result/i)).toHaveAttribute(
      'title',
      'To carefully consider every step, detail, and possible result of a plan or action before doing it.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'thinkThrough_section_expanded', /To carefully consider every step, detail, and possible result/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'thinkThrough', /To carefully consider every step, detail, and possible result/i, /You should think through the consequences before you quit your job\./i, renderPage, getCard);
