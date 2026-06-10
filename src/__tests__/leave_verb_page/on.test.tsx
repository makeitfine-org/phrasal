import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "on" section definitions', () => {
  it('renders definition for letting a machine continue working', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To let a machine, device, or light continue working/i)).toBeInTheDocument();
  });

  it('renders definition for continuing to wear clothing', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue wearing a piece of clothing/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To let a machine, device, or light continue working/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To let a machine, device, or light continue working/i)).toHaveAttribute(
      'title',
      'To let a machine, device, or light continue working.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'leaveOn_section_expanded', /To let a machine, device, or light continue working/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'leaveOn', /To let a machine, device, or light continue working/i, /Don't leave the TV on when you go to sleep\./i, renderPage, getCard);
