import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "off" section definitions', () => {
  it('renders definition for completely paying back a debt', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To completely pay back a debt/i)).toBeInTheDocument();
  });

  it('renders definition for resulting in success after hard work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To result in success or yield good results after hard work or investment/i)).toBeInTheDocument();
  });

  it('renders definition for bribing someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To bribe someone so they keep quiet or do not cause trouble/i)).toBeInTheDocument();
  });

  it('renders definition for dismissing workers with final wages', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To dismiss workers and give them their final wages/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To completely pay back a debt/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To completely pay back a debt/i)).toHaveAttribute(
      'title',
      'To completely pay back a debt.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'payOff_section_expanded', /To completely pay back a debt/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'payOff', /To completely pay back a debt/i, /After five years, the company finally paid off its bank loan\./i, renderPage, getCard);
