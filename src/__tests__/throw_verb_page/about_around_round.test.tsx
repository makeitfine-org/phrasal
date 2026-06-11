import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for scattering things untidily', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To scatter things untidily\./i)).toBeInTheDocument();
  });

  it('renders definition for discussing ideas casually', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To discuss ideas or suggestions casually\./i)).toBeInTheDocument();
  });

  it('renders definition for using power aggressively', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To use power, money, or authority aggressively or recklessly/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    const defs = [
      screen.getByText(/To scatter things untidily\./i),
      screen.getByText(/To discuss ideas or suggestions casually\./i),
      screen.getByText(/To use power, money, or authority aggressively or recklessly/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To scatter things untidily\./i)).toHaveAttribute(
      'title',
      'To scatter things untidily.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To discuss ideas or suggestions casually\./i)).toHaveAttribute(
      'title',
      'To discuss ideas or suggestions casually.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To use power, money, or authority aggressively or recklessly/i)).toHaveAttribute(
      'title',
      'To use power, money, or authority aggressively or recklessly (often "throw one\'s weight around").'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'throwAbout_section_expanded', /To scatter things untidily\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'throwAbout', /To scatter things untidily\./i, /Clothes and books were thrown about the messy room\./i, renderPage, getCard);
