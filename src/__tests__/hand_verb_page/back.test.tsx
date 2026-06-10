import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "back" section definitions', () => {
  it('renders definition for returning something to the person who owned it', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the person who owned it or gave it to you\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the person who owned it or gave it to you\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the person who owned it or gave it to you\./i)).toHaveAttribute(
      'title',
      'To return something to the person who owned it or gave it to you.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'handBack_section_expanded', /To return something to the person who owned it or gave it to you\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'handBack', /To return something to the person who owned it or gave it to you\./i, /After reviewing the code, please hand back the printed reports to the project manager\./i, renderPage, getCard);
