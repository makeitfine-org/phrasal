import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "on" section definitions', () => {
  it('renders definition for hitting a door repeatedly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hit a door repeatedly\./i)).toBeInTheDocument();
  });

  it('renders definition for knock-on effect', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Used as "knock-on effect" to describe how one event causes another\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hit a door repeatedly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hit a door repeatedly\./i)).toHaveAttribute(
      'title',
      'To hit a door repeatedly.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'knockOn_section_expanded', /To hit a door repeatedly\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'knockOn', /To hit a door repeatedly\./i, /I knocked on, but no one answered the door\./i, renderPage, getCard);
