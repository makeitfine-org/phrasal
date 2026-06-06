import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "over" section definitions', () => {
  it('renders definition for gaining control', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To gain control of a company, organization/i)).toBeInTheDocument();
  });

  it('renders definition for replacing someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To replace someone in doing a task or job/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'takeOver_section_expanded', /To gain control of a company, organization/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'takeOver', /To gain control of a company, organization/i, /"A larger corporation wants to take over/i, renderPage, getCard);
