import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "out" section definitions', () => {
  it('renders definition for spending free time relaxing or socializing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend free time relaxing or socializing with friends\./i)).toBeInTheDocument();
  });

  it('renders definition for putting wet clothes outside on a line to dry', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put wet clothes outside on a line to dry\./i)).toBeInTheDocument();
  });

  it('renders definition for leaning your body out of a window or opening', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lean your body out of a window or opening\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend free time relaxing or socializing with friends\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend free time relaxing or socializing with friends\./i)).toHaveAttribute(
      'title',
      'To spend free time relaxing or socializing with friends.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'hangOut_section_expanded', /To spend free time relaxing or socializing with friends\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'hangOut', /To spend free time relaxing or socializing with friends\./i, /We usually hang out at the local coffee shop after work\./i, renderPage, getCard);
