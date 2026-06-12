import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "off" section definitions', () => {
  it('renders definition for leaving quickly in a hurry', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave or depart quickly in a hurry\./i)).toBeInTheDocument();
  });

  it('renders definition for detaching a removable garment part', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach a removable part of a garment using a zipper\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To leave or depart quickly in a hurry\./i),
      screen.getByText(/To detach a removable part of a garment using a zipper\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave or depart quickly in a hurry\./i)).toHaveAttribute(
      'title',
      'To leave or depart quickly in a hurry.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach a removable part of a garment using a zipper\./i)).toHaveAttribute(
      'title',
      'To detach a removable part of a garment using a zipper.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'zipOff_section_expanded', /To leave or depart quickly in a hurry\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'zipOff', /To leave or depart quickly in a hurry\./i, /I have to zip off to a dentist appointment now, but I'll call you later\./i, renderPage, getCard);
