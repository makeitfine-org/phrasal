import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "ahead" section definitions', () => {
  it('renders definition for staying in front of competitors', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To stay in front of others or stay more advanced than competitors\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To stay in front of others or stay more advanced than competitors\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To stay in front of others or stay more advanced than competitors\./i)).toHaveAttribute(
      'title',
      'To stay in front of others or stay more advanced than competitors.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'keepAhead_section_expanded', /To stay in front of others or stay more advanced than competitors\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'keepAhead', /To stay in front of others or stay more advanced than competitors\./i, /To succeed in business, you must innovate to keep ahead of your rivals\./i, renderPage, getCard);
