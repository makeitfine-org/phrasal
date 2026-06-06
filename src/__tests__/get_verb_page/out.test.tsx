import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'out', 'getOut_section_expanded', /To leave a place or a car/i, renderPage);

describe(`${LABEL} — "out" section independence`, () => {
  it('collapsing "out" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('into');
    expandSection('out');
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To become interested or involved in something/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'out', renderPage);

describe('GetVerbPage — "out" section definitions', () => {
  it('all 4 "out" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a place or a car/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become known/i)).toHaveClass('truncate');
    expect(screen.getByText(/To produce or publish something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To avoid doing something you do not want to do/i)).toHaveClass('truncate');
  });

  it('all 4 "out" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a place or a car/i)).toHaveAttribute('title', 'To leave a place or a car');
    expect(screen.getByText(/To become known/i)).toHaveAttribute('title', 'To become known (usually a secret or hidden information)');
    expect(screen.getByText(/To produce or publish something/i)).toHaveAttribute('title', 'To produce or publish something');
    expect(screen.getByText(/To avoid doing something you do not want to do/i)).toHaveAttribute('title', 'To avoid doing something you do not want to do (often "get out of")');
  });
});

describe('GetVerbPage — "out" card expand / collapse', () => {
  it('"out" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The fire alarm rang, and everyone got out of the building\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The news of the CEO leaving got out to the press\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get this new application out by next month\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He tried to get out of doing the presentation, but his boss said no\."/i)).not.toBeInTheDocument();
  });

  it('example is visible in collapsed view without clicking', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, and everyone got out of the building\."/i)).toBeInTheDocument();
  });

  it('all 4 "out" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, and everyone got out of the building\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The news of the CEO leaving got out to the press\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get this new application out by next month\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He tried to get out of doing the presentation, but his boss said no\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "out" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveAttribute(
      'title',
      '"The fire alarm rang, and everyone got out of the building."'
    );
  });

});

describeDefaultImageCards(LABEL, 'out', 'getOut', /To leave a place or a car/i, /"The fire alarm rang/i, renderPage, getCard);
