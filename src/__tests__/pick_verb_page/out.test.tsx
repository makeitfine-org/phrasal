import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "out" section definitions', () => {
  it('renders definition for choosing or selecting carefully', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose or select carefully/i)).toBeInTheDocument();
  });

  it('renders definition for recognizing someone in a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To recognize someone or something in a group/i)).toBeInTheDocument();
  });

  it('renders definition for playing a tune slowly or with difficulty', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To play a tune on an instrument slowly or with difficulty/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose or select carefully/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose or select carefully/i)).toHaveAttribute(
      'title',
      'To choose or select carefully.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'pickOut_section_expanded', /To choose or select carefully/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'pickOut', /To choose or select carefully/i, /We need to pick out a good candidate for the management role\./i, renderPage, getCard);
