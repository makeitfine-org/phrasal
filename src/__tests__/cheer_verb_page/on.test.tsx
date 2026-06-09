import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheerVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheerVerbPage — "on" section definitions', () => {
  it('renders definition for encouraging someone by shouting words of support', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i)).toHaveAttribute(
      'title',
      'To encourage someone by shouting words of support, usually when they are competing or doing something difficult.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'cheerOn_section_expanded', /To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'cheerOn', /To encourage someone by shouting words of support, usually when they are competing or doing something difficult\./i, /The whole department went to the meeting to cheer her on/i, renderPage, getCard);
