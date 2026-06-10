import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "off" section definitions', () => {
  it("renders definition for ending a worker's employment", () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a worker's employment/i)).toBeInTheDocument();
  });

  it('renders definition for stopping criticism or bothering', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop criticizing or bothering someone\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping using something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop using, consuming, or doing something for a while\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a worker's employment/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a worker's employment/i)).toHaveAttribute(
      'title',
      "To end a worker's employment, usually because the company has no work or no budget."
    );
  });
});

describeSectionToggle(LABEL, 'off', 'layOff_section_expanded', /To end a worker's employment/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'layOff', /To end a worker's employment/i, /The business had to lay off 20 employees due to the economic crisis\./i, renderPage, getCard);
