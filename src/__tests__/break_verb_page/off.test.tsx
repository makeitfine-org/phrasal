import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "off" section definitions', () => {
  it('renders definition for removing a part by force', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a part of something \(by force or snapping\)/i)).toBeInTheDocument();
  });

  it('renders definition for suddenly stopping speaking', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To suddenly stop speaking or doing something/i)).toBeInTheDocument();
  });

  it('renders definition for ending a relationship or agreement', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a relationship, agreement, or negotiation/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a part of something \(by force or snapping\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly stop speaking or doing something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end a relationship, agreement, or negotiation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a part of something \(by force or snapping\)/i)).toHaveAttribute(
      'title',
      'To remove a part of something (by force or snapping).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'breakOff_section_expanded', /To remove a part of something \(by force or snapping\)/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'breakOff', /To remove a part of something \(by force or snapping\)/i, /He broke off a square of chocolate/i, renderPage, getCard);
