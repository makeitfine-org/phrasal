import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "together" section definitions', () => {
  it('renders definition for becoming closely united', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To become closely united or emotionally connected\./i)).toBeInTheDocument();
  });

  it('renders definition for fusing or joining while growing', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To fuse or join while growing/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To become closely united or emotionally connected\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To become closely united or emotionally connected\./i)).toHaveAttribute(
      'title',
      'To become closely united or emotionally connected.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'growTogether_section_expanded', /To become closely united or emotionally connected\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'growTogether', /To become closely united or emotionally connected\./i, /After the merger, the two departments slowly grew together to form one strong team\./i, renderPage, getCard);
