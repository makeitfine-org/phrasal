import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "out / out of" section definitions', () => {
  it('renders definition for reversing out of a space', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To drive a vehicle backward out of a space/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing from a commitment', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To decide not to do something that you agreed or promised to do/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To drive a vehicle backward out of a space/i)).toHaveClass('truncate');
    expect(screen.getByText(/To decide not to do something that you agreed or promised to do/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To drive a vehicle backward out of a space/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backward out of a space.'
    );
  });
});

describeSectionToggle(LABEL, 'out / out of', 'backOut_section_expanded', /To drive a vehicle backward out of a space/i, renderPage);

describeChevronAndColour(LABEL, 'out / out of', renderPage);

describeDefaultImageCards(LABEL, 'out / out of', 'backOut', /To drive a vehicle backward out of a space/i, /She backed out of the garage very slowly/i, renderPage, getCard);
