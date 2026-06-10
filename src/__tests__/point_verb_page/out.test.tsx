import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PointVerbPage — "out" section definitions', () => {
  it('renders definition for telling someone a fact they did not know', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To tell someone a fact they did not know or had forgotten/i)).toBeInTheDocument();
  });

  it('renders definition for directing attention using your finger', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To direct attention to someone or something using your finger/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To tell someone a fact they did not know or had forgotten/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To tell someone a fact they did not know or had forgotten/i)).toHaveAttribute(
      'title',
      'To tell someone a fact they did not know or had forgotten.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'pointOut_section_expanded', /To tell someone a fact they did not know or had forgotten/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'pointOut', /To tell someone a fact they did not know or had forgotten/i, /The lead developer pointed out/i, renderPage, getCard);
