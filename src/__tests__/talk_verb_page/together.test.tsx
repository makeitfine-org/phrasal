import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "together" section definitions', () => {
  it('renders definition for conversing with one another', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To converse with one another \(literal meaning\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To converse with one another \(literal meaning\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To converse with one another \(literal meaning\)\./i)).toHaveAttribute(
      'title',
      'To converse with one another (literal meaning).'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'talkTogether_section_expanded', /To converse with one another \(literal meaning\)\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'talkTogether', /To converse with one another \(literal meaning\)\./i, /The two developers talked together quietly in the corner\./i, renderPage, getCard);
