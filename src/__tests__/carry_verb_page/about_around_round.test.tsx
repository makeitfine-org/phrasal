import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for keeping something with you everywhere', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something with you everywhere you go/i)).toBeInTheDocument();
  });

  it('renders definition for holding onto a feeling', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To hold onto a feeling or emotion/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something with you everywhere you go/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something with you everywhere you go/i)).toHaveAttribute(
      'title',
      'To keep something with you everywhere you go (physical).'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'carryAbout_section_expanded', /To keep something with you everywhere you go/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'carryAbout', /To keep something with you everywhere you go/i, /carries around a notebook to write down new software ideas/i, renderPage, getCard);
