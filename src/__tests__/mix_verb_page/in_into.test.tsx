import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MixVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('MixVerbPage — "in / into" section definitions', () => {
  it('renders definition for putting a substance into a mixture', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put a new substance into an existing mixture and stir it/i)).toBeInTheDocument();
  });

  it('renders definition for joining a group and interacting naturally', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To join a group of people and interact with them naturally/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put a new substance into an existing mixture and stir it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put a new substance into an existing mixture and stir it/i)).toHaveAttribute(
      'title',
      'To put a new substance into an existing mixture and stir it.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'mixIn_section_expanded', /To put a new substance into an existing mixture and stir it/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'mixIn', /To put a new substance into an existing mixture and stir it/i, /Add the sugar to the bowl and mix it in slowly\./i, renderPage, getCard);
