import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "apart" section definitions', () => {
  it('renders definition for destroying with explosion', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy something using an explosion\./i)).toBeInTheDocument();
  });

  it('renders definition for destroying an argument', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy an argument, idea, or plan by showing its flaws\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy something using an explosion\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To completely destroy something using an explosion\./i)).toHaveAttribute(
      'title',
      'To completely destroy something using an explosion.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'blowApart_section_expanded', /To completely destroy something using an explosion\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'blowApart', /To completely destroy something using an explosion\./i, /The bomb blew the old building apart/i, renderPage, getCard);
