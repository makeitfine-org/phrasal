import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "back" section definitions', () => {
  it('renders definition for drinking something quickly', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To drink something quickly/i)).toBeInTheDocument();
  });

  it('renders definition for reverting to an earlier time or type', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To revert to or resemble an earlier time or type/i)).toBeInTheDocument();
  });

  it('renders definition for delaying or impeding progress', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay or impede progress\./i)).toBeInTheDocument();
  });

  it('renders definition for being forced to rely on something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To be forced to rely on something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    const defs = [
      screen.getByText(/To drink something quickly/i),
      screen.getByText(/To revert to or resemble an earlier time or type/i),
      screen.getByText(/To delay or impede progress\./i),
      screen.getByText(/To be forced to rely on something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To drink something quickly/i)).toHaveAttribute(
      'title',
      'To drink something quickly (usually alcohol).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To revert to or resemble an earlier time or type/i)).toHaveAttribute(
      'title',
      'To revert to or resemble an earlier time or type (often a noun: "throwback").'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To delay or impede progress\./i)).toHaveAttribute(
      'title',
      'To delay or impede progress.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To be forced to rely on something/i)).toHaveAttribute(
      'title',
      'To be forced to rely on something (often "throw back on").'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'throwBack_section_expanded', /To drink something quickly/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'throwBack', /To drink something quickly/i, /He threw back a shot of whiskey and left the bar\./i, renderPage, getCard);
