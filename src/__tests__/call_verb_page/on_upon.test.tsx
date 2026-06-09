import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "on / upon" section definitions', () => {
  it('renders definition for asking formally to speak', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To ask someone formally to speak or do something\./i)).toBeInTheDocument();
  });

  it('renders definition for using a skill or resource', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To use a quality, skill, or resource that you have\./i)).toBeInTheDocument();
  });

  it('renders definition for visiting formally', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To visit someone for a short time \(often formally\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To ask someone formally to speak or do something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To ask someone formally to speak or do something\./i)).toHaveAttribute(
      'title',
      'To ask someone formally to speak or do something.'
    );
  });
});

describeSectionToggle(LABEL, 'on / upon', 'callOn_section_expanded', /To ask someone formally to speak or do something\./i, renderPage);

describeChevronAndColour(LABEL, 'on / upon', renderPage);

describeDefaultImageCards(LABEL, 'on / upon', 'callOn', /To ask someone formally to speak or do something\./i, /call on our CEO to say a few words/i, renderPage, getCard);
