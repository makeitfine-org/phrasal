import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'forward', 'putForward_section_expanded', /To suggest an idea, plan, or person for consideration/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describe('PutVerbPage — "forward" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/"The manager put forward a new agile framework for the team\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Don't forget to put your clocks forward in the spring\."/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('forward');
    expect(getCard(/To suggest an idea, plan, or person for consideration/i)).toHaveClass('cursor-default');
    expect(getCard(/To change a clock to a later time/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('forward');
    fireEvent.click(getCard(/To suggest an idea, plan, or person for consideration/i));
    fireEvent.click(getCard(/To change a clock to a later time/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
