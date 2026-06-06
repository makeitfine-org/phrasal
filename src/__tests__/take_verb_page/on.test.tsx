import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "on" section definitions', () => {
  it('renders definition for accepting responsibility', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accept or take responsibility for work/i)).toBeInTheDocument();
  });

  it('renders definition for hiring someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To employ or hire someone/i)).toBeInTheDocument();
  });

  it('renders definition for competing against', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To compete or fight against someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on', 'takeOn_section_expanded', /To accept or take responsibility for work/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'takeOn', /To accept or take responsibility for work/i, /"I cannot take on any new projects/i, renderPage, getCard);
