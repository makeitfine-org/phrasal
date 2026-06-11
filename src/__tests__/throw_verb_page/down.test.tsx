import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "down" section definitions', () => {
  it('renders definition for dropping something to the ground violently', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or push someone or something to the ground violently or abruptly\./i)).toBeInTheDocument();
  });

  it('renders definition for issuing a challenge', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To issue a challenge/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To drop or push someone or something to the ground violently or abruptly\./i),
      screen.getByText(/To issue a challenge/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop or push someone or something to the ground violently or abruptly\./i)).toHaveAttribute(
      'title',
      'To drop or push someone or something to the ground violently or abruptly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To issue a challenge/i)).toHaveAttribute(
      'title',
      'To issue a challenge (often "throw down the gauntlet").'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'throwDown_section_expanded', /To drop or push someone or something to the ground violently or abruptly\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'throwDown', /To drop or push someone or something to the ground violently or abruptly\./i, /He threw down his pen in frustration and walked out\./i, renderPage, getCard);
