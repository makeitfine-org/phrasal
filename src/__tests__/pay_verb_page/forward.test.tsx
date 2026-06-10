import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "forward" section definitions', () => {
  it('renders definition for responding to kindness with a good deed for someone else', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To respond to someone's kindness or help by doing a good deed for someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To respond to someone's kindness or help by doing a good deed for someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To respond to someone's kindness or help by doing a good deed for someone else/i)).toHaveAttribute(
      'title',
      "To respond to someone's kindness or help by doing a good deed for someone else, rather than returning the favor to the original person."
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'payForward_section_expanded', /To respond to someone's kindness or help by doing a good deed for someone else/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'payForward', /To respond to someone's kindness or help by doing a good deed for someone else/i, /My mentor helped me start my career, so I try to pay it forward by mentoring junior developers\./i, renderPage, getCard);
