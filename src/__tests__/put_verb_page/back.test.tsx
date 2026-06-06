import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'back', 'putBack_section_expanded', /To return something to its original place/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describe('PutVerbPage — "back" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/"Please put the laptop back in the cabinet\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The product launch was put back to November\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put the clocks back one hour in the autumn\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return something to its original place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'back', 'putBack', /To return something to its original place/i, /"Please put the laptop back/i, renderPage, getCard);
