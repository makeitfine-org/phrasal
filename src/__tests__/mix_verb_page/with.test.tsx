import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MixVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('MixVerbPage — "with" section definitions', () => {
  it('renders definition for spending time talking to different people at a social event', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time talking to different people, usually at a social event/i)).toBeInTheDocument();
  });

  it('renders definition for putting two or more substances together', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put two or more substances together/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time talking to different people, usually at a social event/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time talking to different people, usually at a social event/i)).toHaveAttribute(
      'title',
      'To spend time talking to different people, usually at a social event or at work.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'mixWith_section_expanded', /To spend time talking to different people, usually at a social event/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'mixWith', /To spend time talking to different people, usually at a social event/i, /A good leader needs to be able to mix with people from all departments\./i, renderPage, getCard);
