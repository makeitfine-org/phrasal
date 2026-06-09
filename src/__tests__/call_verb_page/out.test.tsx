import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "out" section definitions', () => {
  it('renders definition for publicly criticizing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To publicly criticize someone for doing something wrong\./i)).toBeInTheDocument();
  });

  it('renders definition for asking a professional for emergency', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To ask a professional to come for an emergency\./i)).toBeInTheDocument();
  });

  it('renders definition for speaking loudly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To speak loudly so someone can hear you\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To publicly criticize someone for doing something wrong\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To publicly criticize someone for doing something wrong\./i)).toHaveAttribute(
      'title',
      'To publicly criticize someone for doing something wrong.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'callOut_section_expanded', /To publicly criticize someone for doing something wrong\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'callOut', /To publicly criticize someone for doing something wrong\./i, /called out the team member for unprofessional behavior/i, renderPage, getCard);
