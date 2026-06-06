import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'down', 'putDown_section_expanded', /To write something down/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describe('PutVerbPage — "down" section definitions', () => {
  it('all 6 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something down/i)).toHaveClass('truncate');
    expect(screen.getByText(/To criticize or humiliate someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To pay a deposit/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suppress a rebellion or protest by force/i)).toHaveClass('truncate');
    expect(screen.getByText(/To euthanize an animal/i)).toHaveClass('truncate');
    expect(screen.getByText(/To attribute a cause to something/i)).toHaveClass('truncate');
  });
});

describe('PutVerbPage — "down" card view', () => {
  it('all 6 examples visible without expanding cards', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/"Let me put down your contact details\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"A good leader never puts down their team members\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put down a 10% deposit for the new office space\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The government quickly put down the protests\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The vet had to put down the sick dog\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put the project's success down to excellent teamwork\."/i)).toBeInTheDocument();
  });

  it('no "down" card renders an image regardless of clicks', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To write something down/i));
    fireEvent.click(getCard(/To criticize or humiliate someone/i));
    fireEvent.click(getCard(/To pay a deposit/i));
    fireEvent.click(getCard(/To suppress a rebellion or protest by force/i));
    fireEvent.click(getCard(/To euthanize an animal/i));
    fireEvent.click(getCard(/To attribute a cause to something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'down', 'putDown', /To write something down/i, /"Let me put down your contact details/i, renderPage, getCard);
