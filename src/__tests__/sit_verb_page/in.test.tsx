import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "in" section definitions', () => {
  it('renders definition for attending as an observer', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attend a meeting or class as an observer/i)).toBeInTheDocument();
  });

  it('renders definition for temporarily replacing someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace someone and do their job/i)).toBeInTheDocument();
  });

  it('renders definition for occupying a building as protest', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To occupy a building as a form of protest\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attend a meeting or class as an observer/i)).toHaveClass('truncate');
    expect(screen.getByText(/To temporarily replace someone and do their job/i)).toHaveClass('truncate');
    expect(screen.getByText(/To occupy a building as a form of protest\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attend a meeting or class as an observer/i)).toHaveAttribute(
      'title',
      'To attend a meeting or class as an observer, rather than an active participant (sit in on).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'sitIn_section_expanded', /To attend a meeting or class as an observer/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'sitIn', /To attend a meeting or class as an observer/i, /As a junior developer, can I sit in on the architecture meeting to learn how it works\?/i, renderPage, getCard);
