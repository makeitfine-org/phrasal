import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "apart" section definitions', () => {
  it('renders definition for making someone different and better than others', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To make someone or something different and better than others\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping time or space for a special purpose', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To keep time or space for a special purpose\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To make someone or something different and better than others\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To make someone or something different and better than others\./i)).toHaveAttribute(
      'title',
      'To make someone or something different and better than others.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'setApart_section_expanded', /To make someone or something different and better than others\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'setApart', /To make someone or something different and better than others\./i, /Her excellent leadership skills set her apart from other managers\./i, renderPage, getCard);
