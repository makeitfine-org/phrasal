import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "off" section definitions', () => {
  it('renders definition for not punishing someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To not punish someone, or to give them a very light punishment/i)).toBeInTheDocument();
  });

  it('renders definition for making something explode', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make a bomb explode, or to fire a gun or firework/i)).toBeInTheDocument();
  });

  it('renders definition for excusing someone from a duty', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To excuse someone from a duty or obligation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To not punish someone, or to give them a very light punishment/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To not punish someone, or to give them a very light punishment/i)).toHaveAttribute(
      'title',
      'To not punish someone, or to give them a very light punishment.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'letOff_section_expanded', /To not punish someone, or to give them a very light punishment/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'letOff', /To not punish someone, or to give them a very light punishment/i, /The boss let him off with a warning for being late to the meeting\./i, renderPage, getCard);
