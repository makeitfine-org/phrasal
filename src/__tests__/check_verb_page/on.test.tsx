import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "on" section definitions', () => {
  it('renders definition for looking at someone to make sure they are okay', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To look at someone or something to make sure they are safe, progressing well, or in good condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To look at someone or something to make sure they are safe, progressing well, or in good condition\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To look at someone or something to make sure they are safe, progressing well, or in good condition\./i)).toHaveAttribute(
      'title',
      'To look at someone or something to make sure they are safe, progressing well, or in good condition.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'checkOn_section_expanded', /To look at someone or something to make sure they are safe, progressing well, or in good condition\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'checkOn', /To look at someone or something to make sure they are safe, progressing well, or in good condition\./i, /The manager stopped by to check on the new Java developers\./i, renderPage, getCard);
