import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "off" section definitions', () => {
  it('renders definition for ignoring someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone or fail to attend an appointment\./i)).toBeInTheDocument();
  });

  it('renders definition for ignoring a task', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore a responsibility or task\./i)).toBeInTheDocument();
  });

  it('renders definition for releasing pressure', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To release physical or emotional pressure/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone or fail to attend an appointment\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To ignore someone or fail to attend an appointment\./i)).toHaveAttribute(
      'title',
      'To ignore someone or fail to attend an appointment.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'blowOff_section_expanded', /To ignore someone or fail to attend an appointment\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'blowOff', /To ignore someone or fail to attend an appointment\./i, /he blew me off/i, renderPage, getCard);
