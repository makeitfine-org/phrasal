import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "out" section definitions', () => {
  it('renders definition for choosing not to participate', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose not to participate in an activity\./i)).toBeInTheDocument();
  });

  it('renders definition for waiting out a difficult situation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To wait patiently until a difficult or unpleasant situation finishes\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose not to participate in an activity\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To wait patiently until a difficult or unpleasant situation finishes\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose not to participate in an activity\./i)).toHaveAttribute(
      'title',
      'To choose not to participate in an activity.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'sitOut_section_expanded', /To choose not to participate in an activity\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'sitOut', /To choose not to participate in an activity\./i, /I don't know much about this part of the project, so I will sit this discussion out\./i, renderPage, getCard);
