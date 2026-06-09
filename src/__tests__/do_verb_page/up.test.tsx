import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "up" section definitions', () => {
  it('renders definition for fastening clothes or seatbelts', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fasten or tie clothes, shoelaces, or seatbelts\./i)).toBeInTheDocument();
  });

  it('renders definition for repairing or renovating a building', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To repair, decorate, or renovate a building or room\./i)).toBeInTheDocument();
  });

  it('renders definition for wrapping a parcel or gift', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wrap a parcel or gift\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fasten or tie clothes, shoelaces, or seatbelts\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fasten or tie clothes, shoelaces, or seatbelts\./i)).toHaveAttribute(
      'title',
      'To fasten or tie clothes, shoelaces, or seatbelts.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'doUp_section_expanded', /To fasten or tie clothes, shoelaces, or seatbelts\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'doUp', /To fasten or tie clothes, shoelaces, or seatbelts\./i, /make sure to do up your coat/i, renderPage, getCard);
