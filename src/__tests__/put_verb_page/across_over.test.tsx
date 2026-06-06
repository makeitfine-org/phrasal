import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'across / over', 'putAcrossOver_section_expanded', /To explain an idea clearly so people understand it/i, renderPage);

describeChevronAndColour(LABEL, 'across / over', renderPage);

describe('PutVerbPage — "across / over" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('across / over');
    expect(screen.getByText(/"The CEO put his vision across very well during the meeting\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('across / over');
    fireEvent.click(getCard(/To explain an idea clearly so people understand it/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'across / over', 'putAcrossOver', /To explain an idea clearly so people understand it/i, /"The CEO put his vision across/i, renderPage, getCard);
