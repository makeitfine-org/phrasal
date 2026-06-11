import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "on" section definitions', () => {
  it('renders definition for attacking someone or making an animal attack', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attack someone, or to make an animal attack someone\./i)).toBeInTheDocument();
  });

  it('renders definition for being very determined to do something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be very determined to do something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attack someone, or to make an animal attack someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attack someone, or to make an animal attack someone\./i)).toHaveAttribute(
      'title',
      'To attack someone, or to make an animal attack someone.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'setOn_section_expanded', /To attack someone, or to make an animal attack someone\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'setOn', /To attack someone, or to make an animal attack someone\./i, /The security guards set their dogs on the intruders\./i, renderPage, getCard);
