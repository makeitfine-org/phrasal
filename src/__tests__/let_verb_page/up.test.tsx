import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "up" section definitions', () => {
  it('renders definition for stopping or becoming less severe', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop or become less severe/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working as hard', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop working as hard as you were before/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop or become less severe/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop or become less severe/i)).toHaveAttribute(
      'title',
      'To stop or become less severe (usually referring to bad weather or a difficult situation).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'letUp_section_expanded', /To stop or become less severe/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'letUp', /To stop or become less severe/i, /The heavy workload hasn't let up since we started this new project\./i, renderPage, getCard);
