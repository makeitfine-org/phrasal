import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "down" section definitions', () => {
  it('renders definition for speaking condescendingly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To speak to someone as if they are less intelligent/i)).toBeInTheDocument();
  });

  it('renders definition for negotiating a lower price', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To negotiate a lower price for something\./i)).toBeInTheDocument();
  });

  it('renders definition for guiding an aircraft to land', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To guide an aircraft to a safe landing using radio instructions\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To speak to someone as if they are less intelligent/i),
      screen.getByText(/To negotiate a lower price for something\./i),
      screen.getByText(/To guide an aircraft to a safe landing using radio instructions\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To speak to someone as if they are less intelligent/i)).toHaveAttribute(
      'title',
      'To speak to someone as if they are less intelligent or less important than you (talk down to).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To negotiate a lower price for something\./i)).toHaveAttribute(
      'title',
      'To negotiate a lower price for something.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To guide an aircraft to a safe landing using radio instructions\./i)).toHaveAttribute(
      'title',
      'To guide an aircraft to a safe landing using radio instructions.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'talkDown_section_expanded', /To speak to someone as if they are less intelligent/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'talkDown', /To speak to someone as if they are less intelligent/i, /A good leader never talks down to their team members\./i, renderPage, getCard);
