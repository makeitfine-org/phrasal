import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "down" section definitions', () => {
  it('renders definition for stopping something from increasing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop the number, level, or size of something from increasing\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping food in your stomach', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep food or medicine in your stomach without vomiting\./i)).toBeInTheDocument();
  });

  it('renders definition for staying hidden', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stay hidden by crouching or lying flat\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing people from having power', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To prevent a person or group of people from having power or freedom\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop the number, level, or size of something from increasing\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop the number, level, or size of something from increasing\./i)).toHaveAttribute(
      'title',
      'To stop the number, level, or size of something from increasing.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'keepDown_section_expanded', /To stop the number, level, or size of something from increasing\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'keepDown', /To stop the number, level, or size of something from increasing\./i, /We need to keep our expenses down this quarter\./i, renderPage, getCard);
