import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BuildVerbPage — "up" section definitions', () => {
  it('renders definition for gradually increasing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually increase in amount, size, strength, or intensity\./i)).toBeInTheDocument();
  });

  it('renders definition for talking positively about someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To talk about someone or something in a very positive way/i)).toBeInTheDocument();
  });

  it('renders definition for developing an area with buildings', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To develop an area with many buildings and infrastructure\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually increase in amount, size, strength, or intensity\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually increase in amount, size, strength, or intensity\./i)).toHaveAttribute(
      'title',
      'To gradually increase in amount, size, strength, or intensity.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'buildUp_section_expanded', /To gradually increase in amount, size, strength, or intensity\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'buildUp', /To gradually increase in amount, size, strength, or intensity\./i, /technical debt will build up quickly/i, renderPage, getCard);
