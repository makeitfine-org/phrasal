import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'about / around / round', 'putAboutAroundRound_section_expanded', /To spread a rumour or false story/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describe('PutVerbPage — "about / around / round" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/"Someone is putting it about that the company is going bankrupt\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('about / around / round');
    fireEvent.click(getCard(/To spread a rumour or false story/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'about / around / round', 'putAboutAroundRound', /To spread a rumour or false story/i, /"Someone is putting it about/i, renderPage, getCard);
