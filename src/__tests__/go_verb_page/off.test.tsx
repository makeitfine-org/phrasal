import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "off" section definitions', () => {
  it('renders definition for exploding or firing', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To explode or fire \(a weapon or device\)/i)).toBeInTheDocument();
  });

  it('renders definition for making a loud noise (alarm)', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make a sudden loud noise \(an alarm\)/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working or powering down', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop working or power down/i)).toBeInTheDocument();
  });

  it('renders definition for spoiling or going bad', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To spoil or go bad \(food\)/i)).toBeInTheDocument();
  });

  it('renders definition for happening in a specific way', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To happen in a specific way/i)).toBeInTheDocument();
  });

  it('renders definition for stopping liking someone or something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop liking someone or something/i)).toBeInTheDocument();
  });

  it('renders definition for leaving a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a place/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'off', 'goOff_section_expanded', /To explode or fire \(a weapon or device\)/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'goOff', /To explode or fire \(a weapon or device\)/i, /"The bomb went off in the city center/i, renderPage, getCard);
