import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'to', 'putTo_section_expanded', /To suggest an idea or a question to someone directly/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describe('PutVerbPage — "to" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/"I put it to the board of directors, but they rejected the idea\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Moving the server room put us to a lot of trouble\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('to');
    fireEvent.click(getCard(/To suggest an idea or a question to someone directly/i));
    fireEvent.click(getCard(/To cause trouble or expense for someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'to', 'putTo', /To suggest an idea or a question to someone directly/i, /"I put it to the board of directors/i, renderPage, getCard);
