import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'to', 'putTo_section_expanded', /To suggest an idea or a question to someone directly/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describe('PutVerbPage — "to" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/"I put it to the board of directors, but they rejected the idea\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Moving the server room put us to a lot of trouble\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('to');
    expect(getCard(/To suggest an idea or a question to someone directly/i)).toHaveClass('cursor-default');
    expect(getCard(/To cause trouble or expense for someone/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('to');
    fireEvent.click(getCard(/To suggest an idea or a question to someone directly/i));
    fireEvent.click(getCard(/To cause trouble or expense for someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
