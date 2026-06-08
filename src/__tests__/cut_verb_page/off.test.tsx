import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "off" section definitions', () => {
  it('renders definition for removing by cutting', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting someone speaking', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To interrupt someone speaking/i)).toBeInTheDocument();
  });

  it('renders definition for stopping a service or supply', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop providing a service or supply/i)).toBeInTheDocument();
  });

  it('renders definition for isolating a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To isolate or block access to a place/i)).toBeInTheDocument();
  });

  it("renders definition for blocking a vehicle's path", () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To block another vehicle's path aggressively/i)).toBeInTheDocument();
  });

  it('renders definition for disinheriting', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disinherit or stop giving someone money/i)).toBeInTheDocument();
  });

  it('all 6 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt someone speaking/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop providing a service or supply/i)).toHaveClass('truncate');
    expect(screen.getByText(/To isolate or block access to a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To block another vehicle's path aggressively/i)).toHaveClass('truncate');
    expect(screen.getByText(/To disinherit or stop giving someone money/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by cutting/i)).toHaveAttribute(
      'title',
      'To remove something by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'cutOff_section_expanded', /To remove something by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'cutOff', /To remove something by cutting/i, /He cut off the tags from his new shirt/i, renderPage, getCard);
