import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "with" section definitions', () => {
  it('renders definition for reaching a financial agreement', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To reach a financial agreement or pay a debt to a person or organization\./i)).toBeInTheDocument();
  });

  it('renders definition for punishing someone from the past', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To punish someone who has done something bad to you in the past\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To reach a financial agreement or pay a debt to a person or organization\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To reach a financial agreement or pay a debt to a person or organization\./i)).toHaveAttribute(
      'title',
      'To reach a financial agreement or pay a debt to a person or organization.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'settleWith_section_expanded', /To reach a financial agreement or pay a debt to a person or organization\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'settleWith', /To reach a financial agreement or pay a debt to a person or organization\./i, /The company finally settled with its suppliers after a long dispute over the late invoices\./i, renderPage, getCard);
