import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "in" section definitions', () => {
  it('renders definition for making someone stay inside as punishment', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone stay inside as a punishment\./i)).toBeInTheDocument();
  });

  it('renders definition for controlling an emotion', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To control or hide an emotion\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing a fire from dying out', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent a fire from dying out\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone stay inside as a punishment\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone stay inside as a punishment\./i)).toHaveAttribute(
      'title',
      'To make someone stay inside as a punishment.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'keepIn_section_expanded', /To make someone stay inside as a punishment\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'keepIn', /To make someone stay inside as a punishment\./i, /The teacher kept him in after school because he didn't do his homework\./i, renderPage, getCard);
