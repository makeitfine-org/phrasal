import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'up', 'putUp_section_expanded', /To build or erect something/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describe('PutVerbPage — "up" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/"They put up a new office building in Warsaw\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The software provider put up their subscription fees\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I can put you up at my apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/"The competitor put up a strong fight for the market share\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To build or erect something/i));
    fireEvent.click(getCard(/To increase prices or rates/i));
    fireEvent.click(getCard(/To provide accommodation for someone/i));
    fireEvent.click(getCard(/To offer resistance or fight back/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'up', 'putUp', /To build or erect something/i, /"They put up a new office building/i, renderPage, getCard);
