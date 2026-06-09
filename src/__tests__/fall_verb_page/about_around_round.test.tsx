import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for laughing uncontrollably', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To laugh uncontrollably \(mostly British\/Australian English\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To laugh uncontrollably \(mostly British\/Australian English\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To laugh uncontrollably \(mostly British\/Australian English\)\./i)).toHaveAttribute(
      'title',
      'To laugh uncontrollably (mostly British/Australian English).'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'fallAbout_section_expanded', /To laugh uncontrollably \(mostly British\/Australian English\)\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'fallAbout', /To laugh uncontrollably \(mostly British\/Australian English\)\./i, /The whole team fell about laughing during the presentation\./i, renderPage, getCard);
