import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "apart" section definitions', () => {
  it('renders definition for separating by cutting', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or dismantle by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for severely criticizing an argument', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To severely criticize or destroy an argument/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or dismantle by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To severely criticize or destroy an argument/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or dismantle by cutting/i)).toHaveAttribute(
      'title',
      'To separate or dismantle by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'cutApart_section_expanded', /To separate or dismantle by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'cutApart', /To separate or dismantle by cutting/i, /They cut the old ship apart/i, renderPage, getCard);
