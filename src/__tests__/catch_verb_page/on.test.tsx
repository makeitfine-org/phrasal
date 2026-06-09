import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CatchVerbPage — "on" section definitions', () => {
  it('renders definition for understanding something after a delay', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To understand something \(often after a delay or difficulty\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming popular', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become popular or widely accepted\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To understand something \(often after a delay or difficulty\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To understand something \(often after a delay or difficulty\)\./i)).toHaveAttribute(
      'title',
      'To understand something (often after a delay or difficulty).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'catchOn_section_expanded', /To understand something \(often after a delay or difficulty\)\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'catchOn', /To understand something \(often after a delay or difficulty\)\./i, /The syntax of the new Java library was confusing at first/i, renderPage, getCard);
