import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'back', 'getBack_section_expanded', /To return to a place or a state/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describe('GetVerbPage — "back" section definitions', () => {
  it('all 4 "back" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place or a state/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have something returned to you/i)).toHaveClass('truncate');
    expect(screen.getByText(/To return to a previous activity/i)).toHaveClass('truncate');
    expect(screen.getByText(/To take revenge on someone/i)).toHaveClass('truncate');
  });

  it('all 4 "back" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place or a state/i)).toHaveAttribute('title', 'To return to a place or a state');
    expect(screen.getByText(/To have something returned to you/i)).toHaveAttribute('title', 'To have something returned to you');
    expect(screen.getByText(/To return to a previous activity/i)).toHaveAttribute('title', 'To return to a previous activity (often "get back to")');
    expect(screen.getByText(/To take revenge on someone/i)).toHaveAttribute('title', 'To take revenge on someone (often "get back at")');
  });
});

describe('GetVerbPage — "back" card expand / collapse', () => {
  it('"back" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"When did you get back from your business trip\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I finally got my laptop back/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I'll answer that question later/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"She wants to get back at her competitor/i)).not.toBeInTheDocument();
  });

  it('all 4 "back" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/"When did you get back from your business trip\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"I finally got my laptop back from the IT department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I'll answer that question later; let's get back to the main topic\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"She wants to get back at her competitor by launching a better product\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "back" non-expandable cards (default image)', () => {
  it('back card has cursor-default class', () => {
    renderPage();
    expandSection('back');
    const card = getCard(/To return to a place or a state/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "back" card never renders an image', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return to a place or a state/i));
    expect(within(getCard(/To return to a place or a state/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "back" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return to a place or a state/i));
    fireEvent.click(getCard(/To have something returned to you/i));
    fireEvent.click(getCard(/To return to a previous activity/i));
    fireEvent.click(getCard(/To take revenge on someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "back" card does not remove truncate class', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return to a place or a state/i));
    expect(within(getCard(/To return to a place or a state/i)).getByText(/"When did you get back/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "back" localStorage persistence', () => {
  it('clicking "back" card does not save to localStorage', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return to a place or a state/i));
    expect(localStorage.getItem('getBack_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getBack_section_expanded', 'true');
    localStorage.setItem('getBack_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To return to a place or a state/i)).getByText(/"When did you get back/i)).toHaveClass('truncate');
  });
});
