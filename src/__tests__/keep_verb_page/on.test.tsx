import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "on" section definitions', () => {
  it('renders definition for continuing doing something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to employ someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue to employ someone\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving clothing on', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To leave a piece of clothing on your body\./i)).toBeInTheDocument();
  });

  it('renders definition for repeatedly reminding or complaining to someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To repeatedly remind or complain to someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toHaveAttribute(
      'title',
      'To continue doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'keepOn_section_expanded', /To continue doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'keepOn', /To continue doing something\./i, /Even though the project was difficult, the team kept on working\./i, renderPage, getCard);
