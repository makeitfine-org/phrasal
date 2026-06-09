import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "to" section definitions', () => {
  it('renders definition for treating someone in a certain way', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To treat someone in a certain way, usually causing harm, damage, or change\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To treat someone in a certain way, usually causing harm, damage, or change\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To treat someone in a certain way, usually causing harm, damage, or change\./i)).toHaveAttribute(
      'title',
      'To treat someone in a certain way, usually causing harm, damage, or change.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'doTo_section_expanded', /To treat someone in a certain way, usually causing harm, damage, or change\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'doTo', /To treat someone in a certain way, usually causing harm, damage, or change\./i, /what the hairdresser did to my hair/i, renderPage, getCard);
