import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "on" section definitions', () => {
  it('renders definition for putting on clothing quickly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on clothing quickly/i)).toBeInTheDocument();
  });

  it('renders definition for breathing in smoke', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To breathe in smoke from a cigarette or pipe/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on clothing quickly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on clothing quickly/i)).toHaveAttribute(
      'title',
      'To put on clothing quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'pullOn_section_expanded', /To put on clothing quickly/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'pullOn', /To put on clothing quickly/i, /She pulled on a sweater/i, renderPage, getCard);
