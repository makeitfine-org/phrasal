import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "to" section definitions', () => {
  it('renders definition for remembering to do something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To remember to do something/i)).toBeInTheDocument();
  });

  it('renders definition for expecting a situation to be possible', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To expect or imagine that a specific situation is possible\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To remember to do something/i),
      screen.getByText(/To expect or imagine that a specific situation is possible\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To remember to do something/i)).toHaveAttribute(
      'title',
      'To remember to do something (usually used in the negative).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To expect or imagine that a specific situation is possible\./i)).toHaveAttribute(
      'title',
      'To expect or imagine that a specific situation is possible.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'thinkTo_section_expanded', /To remember to do something/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'thinkTo', /To remember to do something/i, /I was so busy that I didn't think to call my clients to update them\./i, renderPage, getCard);
