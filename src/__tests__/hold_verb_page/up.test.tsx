import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "up" section definitions', () => {
  it('renders definition for delaying someone or something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To delay someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining strong when tested', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To remain strong, successful, or true when tested\./i)).toBeInTheDocument();
  });

  it('renders definition for supporting weight', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To support the weight of something\./i)).toBeInTheDocument();
  });

  it('renders definition for robbing someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rob a bank, shop, or person using violence or a weapon\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To delay someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To delay someone or something\./i)).toHaveAttribute(
      'title',
      'To delay someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'holdUp_section_expanded', /To delay someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'holdUp', /To delay someone or something\./i, /A critical bug in the code is holding up the entire product release\./i, renderPage, getCard);
