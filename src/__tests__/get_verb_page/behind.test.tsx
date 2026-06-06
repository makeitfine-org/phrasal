import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'behind', 'getBehind_section_expanded', /To fall behind schedule/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describe('GetVerbPage — "behind" section definitions', () => {
  it('all 2 "behind" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fall behind schedule/i)).toHaveClass('truncate');
    expect(screen.getByText(/To support a person, idea, or project/i)).toHaveClass('truncate');
  });

  it('all 2 "behind" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fall behind schedule/i)).toHaveAttribute(
      'title',
      'To fall behind schedule or fail to keep up with work or payments'
    );
    expect(screen.getByText(/To support a person, idea, or project/i)).toHaveAttribute(
      'title',
      'To support a person, idea, or project'
    );
  });
});

describe('GetVerbPage — "behind" card expand / collapse', () => {
  it('"behind" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I was sick for a week, and I got behind/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The whole team got behind the new manager/i)).not.toBeInTheDocument();
  });

  it('all 2 "behind" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/"I was sick for a week, and I got behind on my emails\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The whole team got behind the new manager's plan\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'behind', 'getBehind', /To fall behind schedule/i, /"I was sick for a week/i, renderPage, getCard);
