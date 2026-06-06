import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'out', 'putOut_section_expanded', /To extinguish a fire or a cigarette/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describe('PutVerbPage — "out" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, but they quickly put out the small fire\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The team put out a new version of the app last night\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I hope it doesn't put you out if we move the meeting to 5 PM\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Don't forget to put out the recycling bins\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To extinguish a fire or a cigarette/i));
    fireEvent.click(getCard(/To publish or release something/i));
    fireEvent.click(getCard(/To inconvenience someone/i));
    fireEvent.click(getCard(/To place something outside/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'out', 'putOut', /To extinguish a fire or a cigarette/i, /"The fire alarm rang, but they quickly put out/i, renderPage, getCard);
