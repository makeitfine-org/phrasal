import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "on" section definitions', () => {
  it('renders definition for continuing', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something/i)).toBeInTheDocument();
  });

  it('renders definition for happening', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To happen or be taking place/i)).toBeInTheDocument();
  });

  it('renders definition for starting operating', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start operating \(power, lights, machines\)/i)).toBeInTheDocument();
  });

  it('renders definition for talking too much', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To talk too much or at excessive length/i)).toBeInTheDocument();
  });

  it('renders definition for proceeding to do something next', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To proceed to do something next after completing a previous action/i)).toBeInTheDocument();
  });

  it('renders definition for basing an opinion on something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To base an opinion or decision on something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on', 'goOn_section_expanded', /To continue doing something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'goOn', /To continue doing something/i, /"Please go on with your code explanation/i, renderPage, getCard);
