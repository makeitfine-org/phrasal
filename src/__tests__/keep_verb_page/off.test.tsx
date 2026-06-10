import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "off" section definitions', () => {
  it('renders definition for avoiding touching or walking on something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid touching or walking on something\./i)).toBeInTheDocument();
  });

  it('renders definition for avoiding discussing a topic', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid mentioning or discussing a specific topic\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing something from touching something else', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To prevent something from touching or harming something else\./i)).toBeInTheDocument();
  });

  it('renders definition for avoiding eating or drinking something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid eating, drinking, or using something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid touching or walking on something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid touching or walking on something\./i)).toHaveAttribute(
      'title',
      'To avoid touching or walking on something.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'keepOff_section_expanded', /To avoid touching or walking on something\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'keepOff', /To avoid touching or walking on something\./i, /Please keep off the grass while the park is being maintained\./i, renderPage, getCard);
