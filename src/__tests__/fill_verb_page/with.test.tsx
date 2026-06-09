import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FillVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FillVerbPage — "with" section definitions', () => {
  it('renders definition for putting a substance into a container', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put a substance or object into a container until there is no more space\./i)).toBeInTheDocument();
  });

  it('renders definition for causing someone to feel a strong emotion', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To cause someone to feel a strong emotion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put a substance or object into a container until there is no more space\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put a substance or object into a container until there is no more space\./i)).toHaveAttribute(
      'title',
      'To put a substance or object into a container until there is no more space.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'fillWith_section_expanded', /To put a substance or object into a container until there is no more space\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'fillWith', /To put a substance or object into a container until there is no more space\./i, /She filled the cup with coffee\./i, renderPage, getCard);
