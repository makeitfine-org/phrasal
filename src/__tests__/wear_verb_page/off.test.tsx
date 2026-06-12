import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "off" section definitions', () => {
  it('renders definition for gradually disappearing or fading', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    const def = screen.getByText(/To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i)).toHaveAttribute(
      'title',
      "To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty."
    );
  });
});

describeSectionToggle(LABEL, 'off', 'wearOff_section_expanded', /To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'wearOff', /To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty\./i, /The excitement of moving to a new country can start to wear off once the heavy paperwork begins\./i, renderPage, getCard);
