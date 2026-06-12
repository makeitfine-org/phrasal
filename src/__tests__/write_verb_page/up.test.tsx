import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "up" section definitions', () => {
  it('renders definition for producing a formal document', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce a formal, complete written document based on notes or a draft\./i)).toBeInTheDocument();
  });

  it('renders definition for recording a rule violation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To officially record someone's poor performance or rule violation in a disciplinary file\./i)).toBeInTheDocument();
  });

  it('renders definition for publishing a praising article', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To publish a review or article praising someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for increasing asset value', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To artificially increase the recorded, nominal value of an asset \(finance\)\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To produce a formal, complete written document based on notes or a draft\./i),
      screen.getByText(/To officially record someone's poor performance or rule violation in a disciplinary file\./i),
      screen.getByText(/To publish a review or article praising someone or something\./i),
      screen.getByText(/To artificially increase the recorded, nominal value of an asset \(finance\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce a formal, complete written document based on notes or a draft\./i)).toHaveAttribute(
      'title',
      'To produce a formal, complete written document based on notes or a draft.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'writeUp_section_expanded', /To produce a formal, complete written document based on notes or a draft\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'writeUp', /To produce a formal, complete written document based on notes or a draft\./i, /Give me an hour to write up the minutes from our meeting\./i, renderPage, getCard);
