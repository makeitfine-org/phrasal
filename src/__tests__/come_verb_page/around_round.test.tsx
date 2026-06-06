import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "around / round" section definitions', () => {
  it('renders definition for changing opinion', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To change your opinion to agree with someone else/i)).toBeInTheDocument();
  });

  it('renders definition for visiting someone', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone at their home or desk/i)).toBeInTheDocument();
  });

  it('renders definition for regaining consciousness', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To regain consciousness \(wake up after fainting\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'around / round', 'comeAround_section_expanded', /To change your opinion to agree with someone else/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'comeAround', /To change your opinion to agree with someone else/i, /"He didn't like the new Java framework at first, but he came around/i, renderPage, getCard);
