import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "against" section definitions', () => {
  it('renders definition for speaking in opposition', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To speak in opposition to an idea, plan, or person\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To speak in opposition to an idea, plan, or person\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To speak in opposition to an idea, plan, or person\./i)).toHaveAttribute(
      'title',
      'To speak in opposition to an idea, plan, or person.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'talkAgainst_section_expanded', /To speak in opposition to an idea, plan, or person\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'talkAgainst', /To speak in opposition to an idea, plan, or person\./i, /Several managers talked against the proposed budget cuts\./i, renderPage, getCard);
