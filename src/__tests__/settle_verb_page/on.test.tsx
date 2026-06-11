import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "on" section definitions', () => {
  it('renders definition for making a final decision', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make a final decision or choice after thinking about multiple options\./i)).toBeInTheDocument();
  });

  it('renders definition for landing on a surface', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To land or rest on a physical surface\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make a final decision or choice after thinking about multiple options\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make a final decision or choice after thinking about multiple options\./i)).toHaveAttribute(
      'title',
      'To make a final decision or choice after thinking about multiple options.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'settleOn_section_expanded', /To make a final decision or choice after thinking about multiple options\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'settleOn', /To make a final decision or choice after thinking about multiple options\./i, /After reviewing several different programming languages, the development team settled on Java for the new project\./i, renderPage, getCard);
