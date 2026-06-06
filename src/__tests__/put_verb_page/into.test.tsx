import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'into', 'putInto_section_expanded', /To invest time, money, or effort into a project/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describe('PutVerbPage — "into" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/"The company put a lot of money into research and development\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"It is hard to put this complex business strategy into simple words\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('into');
    expect(getCard(/To invest time, money, or effort into a project/i)).toHaveClass('cursor-default');
    expect(getCard(/To express something in words/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To invest time, money, or effort into a project/i));
    fireEvent.click(getCard(/To express something in words/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
