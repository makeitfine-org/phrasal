import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShutVerbPage — "in" section definitions', () => {
  it('renders definition for preventing someone from leaving', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent someone or an animal from leaving a room or building by closing the door\./i)).toBeInTheDocument();
  });

  it('renders definition for accidentally catching clothing in a door', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To accidentally catch a body part or clothing in a closing door\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent someone or an animal from leaving a room or building by closing the door\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To accidentally catch a body part or clothing in a closing door\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent someone or an animal from leaving a room or building by closing the door\./i)).toHaveAttribute(
      'title',
      'To prevent someone or an animal from leaving a room or building by closing the door.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'shutIn_section_expanded', /To prevent someone or an animal from leaving a room or building by closing the door\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'shutIn', /To prevent someone or an animal from leaving a room or building by closing the door\./i, /It's raining heavily, so the cat has been shut in all day\./i, renderPage, getCard);
