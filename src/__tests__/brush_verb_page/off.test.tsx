import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "off" section definitions', () => {
  it('renders definition for removing dirt with a brush', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use your hand or a brush to remove dirt, dust, or something unwanted/i)).toBeInTheDocument();
  });

  it('renders definition for ignoring someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone, refuse to listen to them/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use your hand or a brush to remove dirt, dust, or something unwanted/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use your hand or a brush to remove dirt, dust, or something unwanted/i)).toHaveAttribute(
      'title',
      'To use your hand or a brush to remove dirt, dust, or something unwanted from a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'brushOff_section_expanded', /To use your hand or a brush to remove dirt, dust, or something unwanted/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'brushOff', /To use your hand or a brush to remove dirt, dust, or something unwanted/i, /I brushed off my suit before entering the meeting/i, renderPage, getCard);
