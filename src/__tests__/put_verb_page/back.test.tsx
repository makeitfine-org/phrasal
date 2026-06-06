import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'back', 'putBack_section_expanded', /To return something to its original place/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describe('PutVerbPage — "back" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/"Please put the laptop back in the cabinet\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The product launch was put back to November\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put the clocks back one hour in the autumn\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('back');
    expect(getCard(/To return something to its original place/i)).toHaveClass('cursor-default');
    expect(getCard(/To delay an event or appointment/i)).toHaveClass('cursor-default');
    expect(getCard(/To change a clock to an earlier time/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return something to its original place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
