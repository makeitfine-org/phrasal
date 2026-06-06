import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'through', 'putThrough_section_expanded', /To connect someone on the telephone/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describe('PutVerbPage — "through" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/"Please hold the line, I will put you through to the IT department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The tough interview process really put the candidates through a lot of stress\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We finally managed to put the deal through\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To connect someone on the telephone/i));
    fireEvent.click(getCard(/To make someone experience something very difficult/i));
    fireEvent.click(getCard(/To successfully complete a business transaction or proposal/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'through', 'putThrough', /To connect someone on the telephone/i, /"Please hold the line, I will put you through/i, renderPage, getCard);
