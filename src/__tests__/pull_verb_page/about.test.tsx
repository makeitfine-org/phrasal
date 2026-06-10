import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "about" section definitions', () => {
  it('renders definition for treating someone roughly', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To treat someone or something roughly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To treat someone or something roughly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To treat someone or something roughly/i)).toHaveAttribute(
      'title',
      'To treat someone or something roughly.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'pullAbout_section_expanded', /To treat someone or something roughly/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'pullAbout', /To treat someone or something roughly/i, /The older children were pulling the little boy about/i, renderPage, getCard);
