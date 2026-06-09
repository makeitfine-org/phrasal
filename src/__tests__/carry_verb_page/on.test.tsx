import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "on" section definitions', () => {
  it('renders definition for continuing something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toBeInTheDocument();
  });

  it('renders definition for managing a business', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To manage, run, or take part in a business or activity\./i)).toBeInTheDocument();
  });

  it('renders definition for behaving in an uncontrolled way', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To behave in an uncontrolled, angry, or childish way\./i)).toBeInTheDocument();
  });

  it('renders definition for having a secret relationship', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To have a secret, often romantic or sexual, relationship\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toHaveAttribute(
      'title',
      'To continue doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'carryOn_section_expanded', /To continue doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'carryOn', /To continue doing something\./i, /carry on with your coding/i, renderPage, getCard);
