import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "off" section definitions', () => {
  it('renders definition for taking someone or something to a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To take someone or something to a place and leave them there\./i)).toBeInTheDocument();
  });

  it('renders definition for decreasing in level or quality', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in level, amount, or quality\./i)).toBeInTheDocument();
  });

  it('renders definition for falling asleep', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To fall asleep\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To take someone or something to a place and leave them there\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To take someone or something to a place and leave them there\./i)).toHaveAttribute(
      'title',
      'To take someone or something to a place and leave them there.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'dropOff_section_expanded', /To take someone or something to a place and leave them there\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'dropOff', /To take someone or something to a place and leave them there\./i, /I will drop off the management report/i, renderPage, getCard);
