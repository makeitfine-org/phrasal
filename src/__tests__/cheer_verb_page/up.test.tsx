import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheerVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheerVerbPage — "up" section definitions', () => {
  it('renders definition for starting to feel happier', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start feeling happier; to stop being sad\./i)).toBeInTheDocument();
  });

  it('renders definition for making another person feel happier', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make another person feel happier\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start feeling happier; to stop being sad\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start feeling happier; to stop being sad\./i)).toHaveAttribute(
      'title',
      'To start feeling happier; to stop being sad.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'cheerUp_section_expanded', /To start feeling happier; to stop being sad\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'cheerUp', /To start feeling happier; to stop being sad\./i, /You need to cheer up!/i, renderPage, getCard);
