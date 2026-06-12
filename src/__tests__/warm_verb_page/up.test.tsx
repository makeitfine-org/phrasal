import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WarmVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WarmVerbPage — "up" section definitions', () => {
  it('renders definition for increasing temperature', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase in temperature or make someone or something warmer\./i)).toBeInTheDocument();
  });

  it('renders definition for preparing through practice', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To prepare for an activity, event, or performance by practicing or doing gentle exercises\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming more animated in a setting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To become more animated, relaxed, or friendly in a social or professional setting\./i)).toBeInTheDocument();
  });

  it('renders definition for reheating cooked food', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reheat food that has already been cooked\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving a machine running', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To leave a machine running for a short time until it reaches its optimal operating temperature\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To increase in temperature or make someone or something warmer\./i),
      screen.getByText(/To prepare for an activity, event, or performance by practicing or doing gentle exercises\./i),
      screen.getByText(/To become more animated, relaxed, or friendly in a social or professional setting\./i),
      screen.getByText(/To reheat food that has already been cooked\./i),
      screen.getByText(/To leave a machine running for a short time until it reaches its optimal operating temperature\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To increase in temperature or make someone or something warmer\./i)).toHaveAttribute(
      'title',
      'To increase in temperature or make someone or something warmer.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To prepare for an activity, event, or performance by practicing or doing gentle exercises\./i)).toHaveAttribute(
      'title',
      'To prepare for an activity, event, or performance by practicing or doing gentle exercises.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To become more animated, relaxed, or friendly in a social or professional setting\./i)).toHaveAttribute(
      'title',
      'To become more animated, relaxed, or friendly in a social or professional setting.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reheat food that has already been cooked\./i)).toHaveAttribute(
      'title',
      'To reheat food that has already been cooked.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To leave a machine running for a short time until it reaches its optimal operating temperature\./i)).toHaveAttribute(
      'title',
      'To leave a machine running for a short time until it reaches its optimal operating temperature.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'warmUp_section_expanded', /To increase in temperature or make someone or something warmer\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'warmUp', /To increase in temperature or make someone or something warmer\./i, /Let's step inside the cafe to warm up; the wind is freezing today\./i, renderPage, getCard);
