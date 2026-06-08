import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "around / round" section definitions', () => {
  it('renders definition for asking many people', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To ask many different people the same question/i)).toBeInTheDocument();
  });

  it('renders definition for inviting someone to your home', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To invite someone to your home/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To ask many different people the same question/i)).toHaveClass('truncate');
    expect(screen.getByText(/To invite someone to your home/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To ask many different people the same question/i)).toHaveAttribute(
      'title',
      'To ask many different people the same question, usually to find information or get help.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'askAround_section_expanded', /To ask many different people the same question/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'askAround', /To ask many different people the same question/i, /I don't know a good plumber/i, renderPage, getCard);
