import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShutVerbPage — "off" section definitions', () => {
  it('renders definition for stopping the supply of something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop the supply of something \(like water, gas, or electricity\)\./i)).toBeInTheDocument();
  });

  it('renders definition for turning off a machine or engine', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To turn off a machine or engine\./i)).toBeInTheDocument();
  });

  it('renders definition for isolating or separating a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To isolate or separate a place from other areas\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop the supply of something \(like water, gas, or electricity\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To turn off a machine or engine\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To isolate or separate a place from other areas\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop the supply of something \(like water, gas, or electricity\)\./i)).toHaveAttribute(
      'title',
      'To stop the supply of something (like water, gas, or electricity).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'shutOff_section_expanded', /To stop the supply of something \(like water, gas, or electricity\)\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'shutOff', /To stop the supply of something \(like water, gas, or electricity\)\./i, /The plumber had to shut off the water before fixing the pipe\./i, renderPage, getCard);
