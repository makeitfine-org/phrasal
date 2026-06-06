import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'after', 'getAfter_section_expanded', /To urge, remind, or scold someone/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describe('GetVerbPage — "after" section definitions', () => {
  it('all 2 "after" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To urge, remind, or scold someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('all 2 "after" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To urge, remind, or scold someone/i)).toHaveAttribute(
      'title',
      'To urge, remind, or scold someone to do something they are supposed to do'
    );
    expect(screen.getByText(/To chase someone or something/i)).toHaveAttribute(
      'title',
      'To chase someone or something'
    );
  });
});

describe('GetVerbPage — "after" card expand / collapse', () => {
  it('"after" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I need to get after the developers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The dog got after the cat\."/i)).not.toBeInTheDocument();
  });

  it('all 2 "after" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/"I need to get after the developers to finish writing the code\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The dog got after the cat\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'after', 'getAfter', /To urge, remind, or scold someone/i, /"I need to get after the developers/i, renderPage, getCard);
