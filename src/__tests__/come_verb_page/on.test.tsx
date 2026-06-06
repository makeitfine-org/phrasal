import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "on" section definitions', () => {
  it('renders definition for starting to function', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start functioning \(machines, systems, lights\)/i)).toBeInTheDocument();
  });

  it('renders definition for making progress', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make progress or improve/i)).toBeInTheDocument();
  });

  it('renders definition for encouraging someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Used to encourage someone to hurry up, try harder, or stop being unreasonable/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on', 'comeOn_section_expanded', /To start functioning \(machines, systems, lights\)/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'comeOn', /To start functioning \(machines, systems, lights\)/i, /"When the power failed, the backup servers came on automatically/i, renderPage, getCard);
