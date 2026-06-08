import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ActVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ActVerbPage — "on / upon" section definitions', () => {
  it('renders definition for taking action', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To take action because of information/i)).toBeInTheDocument();
  });

  it('renders definition for having an effect', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To have an effect on something/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To take action because of information/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have an effect on something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To take action because of information/i)).toHaveAttribute(
      'title',
      'To take action because of information, advice, or instructions.'
    );
  });
});

describeSectionToggle(LABEL, 'on / upon', 'actOn_section_expanded', /To take action because of information/i, renderPage);

describeChevronAndColour(LABEL, 'on / upon', renderPage);

describeDefaultImageCards(LABEL, 'on / upon', 'actOn', /To take action because of information/i, /The manager decided to act on/i, renderPage, getCard);
