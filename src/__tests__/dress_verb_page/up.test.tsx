import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "up" section definitions', () => {
  it('renders definition for wearing formal clothes for an event', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wear formal, elegant, or special clothes, usually for an event\./i)).toBeInTheDocument();
  });

  it('renders definition for putting on a costume', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To put on a costume to look like someone or something else\./i)).toBeInTheDocument();
  });

  it('renders definition for making something look more attractive', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something look more attractive, interesting, or better than it really is\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wear formal, elegant, or special clothes, usually for an event\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wear formal, elegant, or special clothes, usually for an event\./i)).toHaveAttribute(
      'title',
      'To wear formal, elegant, or special clothes, usually for an event.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'dressUp_section_expanded', /To wear formal, elegant, or special clothes, usually for an event\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'dressUp', /To wear formal, elegant, or special clothes, usually for an event\./i, /we need to dress up/i, renderPage, getCard);
