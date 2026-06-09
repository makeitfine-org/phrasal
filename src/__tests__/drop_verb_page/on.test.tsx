import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "on" section definitions', () => {
  it('renders definition for criticizing someone suddenly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To criticize or punish someone suddenly/i)).toBeInTheDocument();
  });

  it('renders definition for accidentally meeting someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accidentally meet someone or find something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To criticize or punish someone suddenly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To criticize or punish someone suddenly/i)).toHaveAttribute(
      'title',
      'To criticize or punish someone suddenly (mainly UK, informal).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'dropOn_section_expanded', /To criticize or punish someone suddenly/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'dropOn', /To criticize or punish someone suddenly/i, /The boss dropped on the development team/i, renderPage, getCard);
