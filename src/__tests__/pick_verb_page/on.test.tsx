import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "on" section definitions', () => {
  it('renders definition for bullying or treating someone unfairly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To bully or treat someone unfairly/i)).toBeInTheDocument();
  });

  it('renders definition for choosing someone to do a task', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To choose someone to do a task or answer a question/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To bully or treat someone unfairly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To bully or treat someone unfairly/i)).toHaveAttribute(
      'title',
      'To bully or treat someone unfairly.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'pickOn_section_expanded', /To bully or treat someone unfairly/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'pickOn', /To bully or treat someone unfairly/i, /The older children always picked on him at school\./i, renderPage, getCard);
