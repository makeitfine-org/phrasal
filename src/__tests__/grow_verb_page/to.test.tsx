import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "to" section definitions', () => {
  it('renders definition for gradually beginning to experience a feeling', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually begin to experience a feeling or an action/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually begin to experience a feeling or an action/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually begin to experience a feeling or an action/i)).toHaveAttribute(
      'title',
      'To gradually begin to experience a feeling or an action (usually followed by another verb, like like, love, realize, understand).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'growTo_section_expanded', /To gradually begin to experience a feeling or an action/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'growTo', /To gradually begin to experience a feeling or an action/i, /After working with him for a year, I grew to respect his leadership style\./i, renderPage, getCard);
