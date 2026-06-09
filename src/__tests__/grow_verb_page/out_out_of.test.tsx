import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "out / out of" section definitions', () => {
  it('renders definition for allowing hair to grow back', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To allow hair to grow back to its natural style or color\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming too big for a space', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To become too big for a physical space or piece of clothing\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping something as you become more mature', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To stop doing something as you become older or more mature\./i)).toBeInTheDocument();
  });

  it('renders definition for developing as a direct result of something', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To develop or happen as a direct result of something else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To allow hair to grow back to its natural style or color\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To allow hair to grow back to its natural style or color\./i)).toHaveAttribute(
      'title',
      'To allow hair to grow back to its natural style or color.'
    );
  });
});

describeSectionToggle(LABEL, 'out / out of', 'growOut_section_expanded', /To allow hair to grow back to its natural style or color\./i, renderPage);

describeChevronAndColour(LABEL, 'out / out of', renderPage);

describeDefaultImageCards(LABEL, 'out / out of', 'growOut', /To allow hair to grow back to its natural style or color\./i, /She is growing out her dyed blonde hair\./i, renderPage, getCard);
