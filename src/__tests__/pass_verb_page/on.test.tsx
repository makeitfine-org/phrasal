import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "on" section definitions', () => {
  it('renders definition for giving information to someone else', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give information or an object to someone else/i)).toBeInTheDocument();
  });

  it('renders definition for refusing an opportunity or offer', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To refuse an opportunity or offer/i)).toBeInTheDocument();
  });

  it('renders definition for dying (polite phrase)', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To die \(another polite phrase\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give information or an object to someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give information or an object to someone else/i)).toHaveAttribute(
      'title',
      'To give information or an object to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'passOn_section_expanded', /To give information or an object to someone else/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'passOn', /To give information or an object to someone else/i, /Please pass on this message to the development team\./i, renderPage, getCard);
