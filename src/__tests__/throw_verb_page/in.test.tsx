import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "in" section definitions', () => {
  it('renders definition for including something extra for free', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include something extra for free with a purchase\./i)).toBeInTheDocument();
  });

  it('renders definition for interjecting a remark', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interject or add a remark to a conversation\./i)).toBeInTheDocument();
  });

  it('renders definition for surrendering or giving up', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender or give up/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To include something extra for free with a purchase\./i),
      screen.getByText(/To interject or add a remark to a conversation\./i),
      screen.getByText(/To surrender or give up/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include something extra for free with a purchase\./i)).toHaveAttribute(
      'title',
      'To include something extra for free with a purchase.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interject or add a remark to a conversation\./i)).toHaveAttribute(
      'title',
      'To interject or add a remark to a conversation.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To surrender or give up/i)).toHaveAttribute(
      'title',
      'To surrender or give up (often "throw in the towel").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'throwIn_section_expanded', /To include something extra for free with a purchase\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'throwIn', /To include something extra for free with a purchase\./i, /If you buy the laptop today, we'll throw in a carrying case\./i, renderPage, getCard);
