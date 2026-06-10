import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "off" section definitions', () => {
  it('renders definition for falsely presenting something as something else', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To falsely present someone or something as something else/i)).toBeInTheDocument();
  });

  it('renders definition for happening in a certain way', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To happen or take place in a certain way/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To falsely present someone or something as something else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To falsely present someone or something as something else/i)).toHaveAttribute(
      'title',
      'To falsely present someone or something as something else.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'passOff_section_expanded', /To falsely present someone or something as something else/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'passOff', /To falsely present someone or something as something else/i, /He tried to pass off the copied code as his own original work\./i, renderPage, getCard);
