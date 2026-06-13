import { screen, fireEvent } from '@testing-library/react';
import { renderPage, getCard } from '../zip_verb_page/helpers';
import {
  describeSectionToggle,
  describeChevronAndColour,
  describeDefaultImageCards,
} from './sharedSectionTests';

const LABEL = 'ZipVerbPage';
const PARTICLE = 'up';
const FIRST_DEF = /To close a garment, bag, or tent completely by fastening its zipper\./i;
const FIRST_EXAMPLE = /Make sure you zip up your coat; it's freezing outside!/i;

let portalDiv: HTMLDivElement;

beforeAll(() => {
  portalDiv = document.createElement('div');
  portalDiv.id = 'verb-page-actions';
  document.body.appendChild(portalDiv);
});

afterAll(() => {
  portalDiv.remove();
});

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, PARTICLE, 'zipUp_section_expanded', FIRST_DEF, renderPage, true);

describeChevronAndColour(LABEL, PARTICLE, renderPage, true);

describeDefaultImageCards(LABEL, PARTICLE, 'zipUp', FIRST_DEF, FIRST_EXAMPLE, renderPage, getCard, true);

describe('ZipVerbPage — expand/collapse all button', () => {
  it('renders expand-all button in portal target', () => {
    renderPage();
    expect(screen.getByTitle('Expand all')).toBeInTheDocument();
  });

  it('expand-all button expands all sections', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    expect(screen.getByText('up')).toHaveClass('text-white');
    expect(screen.getByText('back')).toHaveClass('text-white');
    expect(screen.getByText('down')).toHaveClass('text-white');
  });

  it('after expand-all, button title changes to Collapse all', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    expect(screen.getByTitle('Collapse all')).toBeInTheDocument();
  });

  it('collapse-all button collapses all sections', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    fireEvent.click(screen.getByTitle('Collapse all'));
    expect(screen.getByText('up')).toHaveClass('text-blue-600');
    expect(screen.getByText('back')).toHaveClass('text-blue-600');
    expect(screen.getByText('down')).toHaveClass('text-blue-600');
  });

  it('expand-all saves section states to localStorage', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    expect(localStorage.getItem('zipUp_section_expanded')).toBe('true');
    expect(localStorage.getItem('zipBack_section_expanded')).toBe('true');
    expect(localStorage.getItem('zipDown_section_expanded')).toBe('true');
  });

  it('collapse-all saves section states to localStorage', () => {
    renderPage();
    fireEvent.click(screen.getByTitle('Expand all'));
    fireEvent.click(screen.getByTitle('Collapse all'));
    expect(localStorage.getItem('zipUp_section_expanded')).toBe('false');
    expect(localStorage.getItem('zipBack_section_expanded')).toBe('false');
    expect(localStorage.getItem('zipDown_section_expanded')).toBe('false');
  });
});

describe('ZipVerbPage — particle text selectability', () => {
  it('particle text spans are selectable (no select-none class)', () => {
    renderPage();
    expect(screen.getByText('up')).not.toHaveClass('select-none');
    expect(screen.getByText('back')).not.toHaveClass('select-none');
    expect(screen.getByText('down')).not.toHaveClass('select-none');
  });

  it('chevron icons are not selectable (have select-none class)', () => {
    renderPage();
    screen.getAllByText('▶').forEach(chevron => {
      expect(chevron).toHaveClass('select-none');
    });
  });
});
