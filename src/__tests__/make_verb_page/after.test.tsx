import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'after', 'makeAfter_section_expanded', /To chase someone or something/i, renderPage);

describe(`${LABEL} — "after" section independence`, () => {
  it('collapsing "after" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('after');
    fireEvent.click(screen.getByText('after'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'after', renderPage);

describe('MakeVerbPage — "after" section definitions', () => {
  it('"after" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('"after" title attribute contains full definition text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i))
      .toHaveAttribute('title', 'To chase someone or something');
  });
});

describe('MakeVerbPage — "after" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/"The security guard made after the shoplifter\."/i)).toBeInTheDocument();
  });

  it('card example has truncate class', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(within(card).getByText(/"The security guard made after the shoplifter\."/i)).toHaveClass('truncate');
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(within(card).getByText(/"The security guard made after the shoplifter\."/i))
      .toHaveAttribute('title', '"The security guard made after the shoplifter."');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To chase someone or something/i));
    expect(within(getCard(/To chase someone or something/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'after', 'makeAfter', /To chase someone or something/i, /"The security guard made after/i, renderPage, getCard);
