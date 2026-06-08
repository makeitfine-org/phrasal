import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "out" section definitions', () => {
  it('renders definition for removing tangles from hair', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove tangles or dirt from hair or fur using a brush\./i)).toBeInTheDocument();
  });

  it('renders definition for cleaning the inside', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean the inside of something with a brush\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove tangles or dirt from hair or fur using a brush\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove tangles or dirt from hair or fur using a brush\./i)).toHaveAttribute(
      'title',
      'To remove tangles or dirt from hair or fur using a brush.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'brushOut_section_expanded', /To remove tangles or dirt from hair or fur using a brush\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'brushOut', /To remove tangles or dirt from hair or fur using a brush\./i, /brush out this dog's thick coat/i, renderPage, getCard);
