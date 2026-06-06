import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'about / around', 'getAboutAround_section_expanded', /To travel to different places/i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describe('GetVerbPage — "about / around" section definitions', () => {
  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To travel to different places/i)).toHaveClass('truncate');
    expect(screen.getByText(/To find a way to avoid a rule/i)).toHaveClass('truncate');
    expect(screen.getByText(/To spread \(usually news or rumors\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finally do something you have delayed/i)).toHaveClass('truncate');
  });

  it('all 4 title attributes contain the full definition text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To travel to different places/i)).toHaveAttribute('title', 'To travel to different places');
    expect(screen.getByText(/To find a way to avoid a rule/i)).toHaveAttribute('title', 'To find a way to avoid a rule or solve a problem');
    expect(screen.getByText(/To spread \(usually news or rumors\)/i)).toHaveAttribute('title', 'To spread (usually news or rumors)');
    expect(screen.getByText(/To finally do something you have delayed/i)).toHaveAttribute(
      'title',
      'To finally do something you have delayed doing (often "get around to")'
    );
  });
});

describe('GetVerbPage — "about / around" card expand / collapse', () => {
  it('cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"We used the subway to get around the city\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The programmers found a clever way/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Word gets around fast in this office\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I will get around to updating my resume/i)).not.toBeInTheDocument();
  });

  it('all 4 example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/"We used the subway to get around the city\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The programmers found a clever way to get around the security block\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Word gets around fast in this office\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will get around to updating my resume this weekend\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "about / around" non-expandable cards (default image)', () => {
  it('card has cursor-default class', () => {
    renderPage();
    expandSection('about / around');
    const card = getCard(/To travel to different places/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking card never renders an image', () => {
    renderPage();
    expandSection('about / around');
    fireEvent.click(getCard(/To travel to different places/i));
    expect(within(getCard(/To travel to different places/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('about / around');
    fireEvent.click(getCard(/To travel to different places/i));
    fireEvent.click(getCard(/To find a way to avoid a rule/i));
    fireEvent.click(getCard(/To spread \(usually news or rumors\)/i));
    fireEvent.click(getCard(/To finally do something you have delayed/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking card does not remove truncate class', () => {
    renderPage();
    expandSection('about / around');
    fireEvent.click(getCard(/To travel to different places/i));
    expect(within(getCard(/To travel to different places/i)).getByText(/"We used the subway/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "about / around" localStorage persistence', () => {
  it('clicking card does not save to localStorage', () => {
    renderPage();
    expandSection('about / around');
    fireEvent.click(getCard(/To travel to different places/i));
    expect(localStorage.getItem('getAboutAround_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAboutAround_section_expanded', 'true');
    localStorage.setItem('getAboutAround_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To travel to different places/i)).getByText(/"We used the subway/i)).toHaveClass('truncate');
  });
});
