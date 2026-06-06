import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'about / around / round', 'putAboutAroundRound_section_expanded', /To spread a rumour or false story/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describe('PutVerbPage — "about / around / round" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/"Someone is putting it about that the company is going bankrupt\."/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(getCard(/To spread a rumour or false story/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('about / around / round');
    fireEvent.click(getCard(/To spread a rumour or false story/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
