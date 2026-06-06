import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'in', 'putIn_section_expanded', /To spend time or effort on something/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describe('PutVerbPage — "in" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/"The development team put in 50 hours a week/i)).toBeInTheDocument();
    expect(screen.getByText(/"We are putting in a new server system today\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put in a request for more holiday time\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I think we should test the code first," the junior developer put in\./i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To spend time or effort on something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'in', 'putIn', /To spend time or effort on something/i, /"The development team put in 50 hours/i, renderPage, getCard);
