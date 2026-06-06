import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "behind" section definitions', () => {
  it('renders definition for going to the back of something', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To go to the back of something/i)).toBeInTheDocument();
  });

  it('renders definition for doing something secretly', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To do something secretly without someone's knowledge or permission/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'behind', 'goBehind_section_expanded', /To go to the back of something/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'goBehind', /To go to the back of something/i, /"The cat went behind the sofa/i, renderPage, getCard);
