import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WarmVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WarmVerbPage — "down" section definitions', () => {
  it('renders definition for warming down after exercise', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    const def = screen.getByText(/To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i)).toHaveAttribute(
      'title',
      'To perform gentle exercises or stretches after vigorous physical activity to help the body recover (British English).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'warmDown_section_expanded', /To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'warmDown', /To perform gentle exercises or stretches after vigorous physical activity to help the body recover \(British English\)\./i, /After testing out the new 20-inch bike on the trail, make sure to walk for a bit to warm down\./i, renderPage, getCard);
