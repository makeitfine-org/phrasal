import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "out" section definitions', () => {
  it('renders definition for removing something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove something from a place or container/i)).toBeInTheDocument();
  });

  it('renders definition for inviting and paying', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go somewhere and pay/i)).toBeInTheDocument();
  });

  it('renders definition for obtaining an official service', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To obtain an official service such as a loan/i)).toBeInTheDocument();
  });

  it('renders definition for destroying', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To destroy or eliminate something/i)).toBeInTheDocument();
  });

  it('renders definition for take it out on', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To direct negative feelings at someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'takeOut_section_expanded', /To remove something from a place or container/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'takeOut', /To remove something from a place or container/i, /"Please take the trash out/i, renderPage, getCard);
