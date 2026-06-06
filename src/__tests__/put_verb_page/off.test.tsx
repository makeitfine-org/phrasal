import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'off', 'putOff_section_expanded', /To delay or postpone something/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describe('PutVerbPage — "off" section definitions', () => {
  it('all 3 "off" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay or postpone something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone not want to do something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To distract someone/i)).toHaveClass('truncate');
  });
});

describe('PutVerbPage — "off" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/"We have to put off the sprint planning meeting until tomorrow\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The complex code architecture put me off learning Java at first\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Please be quiet; your talking is putting me off my work\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To delay or postpone something/i));
    fireEvent.click(getCard(/To make someone not want to do something/i));
    fireEvent.click(getCard(/To distract someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'off', 'putOff', /To delay or postpone something/i, /"We have to put off the sprint planning/i, renderPage, getCard);
