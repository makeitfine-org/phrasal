import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "up" section definitions', () => {
  it('renders definition for moving at the same speed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move at the same speed as someone or something else\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing at a high level', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To continue doing something at a high level\./i)).toBeInTheDocument();
  });

  it('renders definition for staying awake', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stay awake, or to prevent someone from sleeping\./i)).toBeInTheDocument();
  });

  it('renders definition for maintaining something in good condition', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To maintain something in good condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move at the same speed as someone or something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move at the same speed as someone or something else\./i)).toHaveAttribute(
      'title',
      'To move at the same speed as someone or something else.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'keepUp_section_expanded', /To move at the same speed as someone or something else\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'keepUp', /To move at the same speed as someone or something else\./i, /The software industry changes so fast that it's hard to keep up\./i, renderPage, getCard);
