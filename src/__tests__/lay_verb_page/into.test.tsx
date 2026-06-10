import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "into" section definitions', () => {
  it('renders definition for criticizing or attacking angrily', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To criticize someone angrily or attack them physically\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To criticize someone angrily or attack them physically\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To criticize someone angrily or attack them physically\./i)).toHaveAttribute(
      'title',
      'To criticize someone angrily or attack them physically.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'layInto_section_expanded', /To criticize someone angrily or attack them physically\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'layInto', /To criticize someone angrily or attack them physically\./i, /The lead developer laid into the junior programmer for pushing broken code to the main server\./i, renderPage, getCard);
