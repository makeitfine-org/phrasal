import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "in" section definitions', () => {
  it('renders definition for wearing new clothing until comfortable', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    const def = screen.getByText(/To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i)).toHaveAttribute(
      'title',
      'To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'wearIn_section_expanded', /To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'wearIn', /To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use\./i, /I need to walk around the apartment for a few days to wear in these new shoes before we do any serious walking\./i, renderPage, getCard);
