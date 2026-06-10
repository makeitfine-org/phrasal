import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LogVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LogVerbPage — "on" section definitions', () => {
  it('renders definition for connecting to a computer network', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To connect to a computer network or start using a digital system/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To connect to a computer network or start using a digital system/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To connect to a computer network or start using a digital system/i)).toHaveAttribute(
      'title',
      'To connect to a computer network or start using a digital system (same meaning as log in).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'logOn_section_expanded', /To connect to a computer network or start using a digital system/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'logOn', /To connect to a computer network or start using a digital system/i, /The project manager logged on to the company network to review the latest software release\./i, renderPage, getCard);
