import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'UseVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('UseVerbPage — "against" section definitions', () => {
  it('renders definition for utilizing information to harm or gain advantage', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i)).toHaveAttribute(
      'title',
      "To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them."
    );
  });
});

describeSectionToggle(LABEL, 'against', 'useAgainst_section_expanded', /To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'useAgainst', /To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them\./i, /You have the right to remain silent/i, renderPage, getCard);
