import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "off" section definitions', () => {
  it('renders definition for succeeding in something difficult', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something difficult/i)).toBeInTheDocument();
  });

  it('renders definition for winning a prize', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To win a prize, competition, or award\./i)).toBeInTheDocument();
  });

  it('renders definition for causing death', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause death, usually due to a disease/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something difficult/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something difficult/i)).toHaveAttribute(
      'title',
      'To succeed in doing something difficult, often when others did not expect you to.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'carryOff_section_expanded', /To succeed in doing something difficult/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'carryOff', /To succeed in doing something difficult/i, /carried it off perfectly/i, renderPage, getCard);
