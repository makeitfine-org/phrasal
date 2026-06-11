import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "off" section definitions', () => {
  it('renders definition for stopping a device', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop a machine, device, or flow of power\./i)).toBeInTheDocument();
  });

  it('renders definition for causing loss of interest', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause someone to lose interest, enthusiasm, or sexual arousal\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving a road', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a road or path to go onto another\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To stop a machine, device, or flow of power\./i),
      screen.getByText(/To cause someone to lose interest, enthusiasm, or sexual arousal\./i),
      screen.getByText(/To leave a road or path to go onto another\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop a machine, device, or flow of power\./i)).toHaveAttribute(
      'title',
      'To stop a machine, device, or flow of power.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause someone to lose interest, enthusiasm, or sexual arousal\./i)).toHaveAttribute(
      'title',
      'To cause someone to lose interest, enthusiasm, or sexual arousal.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a road or path to go onto another\./i)).toHaveAttribute(
      'title',
      'To leave a road or path to go onto another.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'turnOff_section_expanded', /To stop a machine, device, or flow of power\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'turnOff', /To stop a machine, device, or flow of power\./i, /Remember to turn off the lights when you leave the room\./i, renderPage, getCard);
