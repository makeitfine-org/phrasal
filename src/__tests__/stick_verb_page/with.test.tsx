import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "with" section definitions', () => {
  it('renders definition for continuing using something rather than changing it', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To continue using or doing something, rather than changing it\./i)).toBeInTheDocument();
  });

  it('renders definition for staying close to someone for guidance or safety', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stay close to someone for guidance or safety\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    const defs = [
      screen.getByText(/To continue using or doing something, rather than changing it\./i),
      screen.getByText(/To stay close to someone for guidance or safety\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To continue using or doing something, rather than changing it\./i)).toHaveAttribute(
      'title',
      'To continue using or doing something, rather than changing it.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'stickWith_section_expanded', /To continue using or doing something, rather than changing it\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'stickWith', /To continue using or doing something, rather than changing it\./i, /We decided to stick with the Spring Boot framework instead of learning a new ecosystem\./i, renderPage, getCard);
