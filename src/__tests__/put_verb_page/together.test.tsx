import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'together', 'putTogether_section_expanded', /To assemble the parts of something/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describe('PutVerbPage — "together" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/"We need to put together the new office furniture\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The HR director put together an excellent leadership training program\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('together');
    expect(getCard(/To assemble the parts of something/i)).toHaveClass('cursor-default');
    expect(getCard(/To organize or create a group or plan/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To assemble the parts of something/i));
    fireEvent.click(getCard(/To organize or create a group or plan/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
