import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PointVerbPage — "to" section definitions', () => {
  it('renders definition for mentioning something as proof', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To mention something as proof or as a reason why something happened/i)).toBeInTheDocument();
  });

  it('renders definition for suggesting a situation is likely', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To suggest that a particular situation or result is likely/i)).toBeInTheDocument();
  });

  it('renders definition for physically aiming at something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To physically aim your finger or an object at something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To mention something as proof or as a reason why something happened/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To mention something as proof or as a reason why something happened/i)).toHaveAttribute(
      'title',
      'To mention something as proof or as a reason why something happened.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'pointTo_section_expanded', /To mention something as proof or as a reason why something happened/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'pointTo', /To mention something as proof or as a reason why something happened/i, /The CEO pointed to the new marketing strategy/i, renderPage, getCard);
