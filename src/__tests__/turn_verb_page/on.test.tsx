import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "on" section definitions', () => {
  it('renders definition for starting a device', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start a machine, device, or flow of power\./i)).toBeInTheDocument();
  });

  it('renders definition for attacking someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To suddenly and unexpectedly attack someone, physically or verbally\./i)).toBeInTheDocument();
  });

  it('renders definition for causing excitement', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause someone to feel excited or sexually aroused\./i)).toBeInTheDocument();
  });

  it('renders definition for depending on a detail', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or hinge entirely on a specific detail\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To start a machine, device, or flow of power\./i),
      screen.getByText(/To suddenly and unexpectedly attack someone, physically or verbally\./i),
      screen.getByText(/To cause someone to feel excited or sexually aroused\./i),
      screen.getByText(/To depend or hinge entirely on a specific detail\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To start a machine, device, or flow of power\./i)).toHaveAttribute(
      'title',
      'To start a machine, device, or flow of power.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To suddenly and unexpectedly attack someone, physically or verbally\./i)).toHaveAttribute(
      'title',
      'To suddenly and unexpectedly attack someone, physically or verbally.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To cause someone to feel excited or sexually aroused\./i)).toHaveAttribute(
      'title',
      'To cause someone to feel excited or sexually aroused.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or hinge entirely on a specific detail\./i)).toHaveAttribute(
      'title',
      'To depend or hinge entirely on a specific detail.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'turnOn_section_expanded', /To start a machine, device, or flow of power\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'turnOn', /To start a machine, device, or flow of power\./i, /Can you turn on the air conditioning\?/i, renderPage, getCard);
