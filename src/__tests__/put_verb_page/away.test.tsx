import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'away', 'putAway_section_expanded', /To store things in their correct place/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describe('PutVerbPage — "away" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/"Please put away those files when you finish reading them\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"She puts away a portion of her salary every month for retirement\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The judge put him away for ten years for fraud\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He can really put away a lot of coffee during a coding session\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('away');
    expect(getCard(/To store things in their correct place/i)).toHaveClass('cursor-default');
    expect(getCard(/To save money for the future/i)).toHaveClass('cursor-default');
    expect(getCard(/To send someone to prison or a mental hospital/i)).toHaveClass('cursor-default');
    expect(getCard(/To eat or drink a large amount/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To store things in their correct place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
