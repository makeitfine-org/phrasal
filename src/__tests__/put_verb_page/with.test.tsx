import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'with', 'putWith_section_expanded', /To tolerate or accept a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describe('PutVerbPage — "with" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"As a project manager, you have to put up with unexpected delays\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To tolerate or accept a difficult situation/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'with', 'putWith', /To tolerate or accept a difficult situation/i, /"As a project manager, you have to put up with/i, renderPage, getCard);
