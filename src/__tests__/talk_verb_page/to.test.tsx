import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "to" section definitions', () => {
  it('renders definition for having a conversation with someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To have a conversation with someone\./i)).toBeInTheDocument();
  });

  it('renders definition for reprimanding someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reprimand or scold someone for doing something wrong\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To have a conversation with someone\./i),
      screen.getByText(/To reprimand or scold someone for doing something wrong\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To have a conversation with someone\./i)).toHaveAttribute(
      'title',
      'To have a conversation with someone.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reprimand or scold someone for doing something wrong\./i)).toHaveAttribute(
      'title',
      'To reprimand or scold someone for doing something wrong.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'talkTo_section_expanded', /To have a conversation with someone\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'talkTo', /To have a conversation with someone\./i, /I need to talk to the client tomorrow\./i, renderPage, getCard);
