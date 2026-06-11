import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "out" section definitions', () => {
  it('renders definition for reaching an agreement out of court', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reach an agreement without going through a full court trial/i)).toBeInTheDocument();
  });

  it('renders definition for sinking to the bottom of a liquid', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To sink to the bottom of a liquid\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reach an agreement without going through a full court trial/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reach an agreement without going through a full court trial/i)).toHaveAttribute(
      'title',
      'To reach an agreement without going through a full court trial (often phrased as "settle out of court").'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'settleOut_section_expanded', /To reach an agreement without going through a full court trial/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'settleOut', /To reach an agreement without going through a full court trial/i, /The two companies decided to settle out of court to avoid a long and expensive legal battle\./i, renderPage, getCard);
