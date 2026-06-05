import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "on" section toggle', () => {
  it('renders "on" section toggle', () => {
    renderPage();
    expect(screen.getByText('on')).toBeInTheDocument();
  });

  it('"on" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To dress oneself in clothing/i)).not.toBeInTheDocument();
  });

  it('clicking "on" expands all 5 "on" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText(/To dress oneself in clothing/i)).toBeInTheDocument();
    expect(screen.getByText(/To organize a performance or event/i)).toBeInTheDocument();
    expect(screen.getByText(/To gain weight/i)).toBeInTheDocument();
    expect(screen.getByText(/To turn on a machine or appliance/i)).toBeInTheDocument();
    expect(screen.getByText(/To pretend to have a feeling or attitude/i)).toBeInTheDocument();
  });

  it('clicking "on" twice collapses meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    fireEvent.click(screen.getByText('on'));
    expect(screen.queryByText(/To dress oneself in clothing/i)).not.toBeInTheDocument();
  });

  it('saves "on" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(localStorage.getItem('putOn_section_expanded')).toBe('true');
  });

  it('restores "on" section collapsed state from localStorage', () => {
    localStorage.setItem('putOn_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To dress oneself in clothing/i)).not.toBeInTheDocument();
  });
});

describe('PutVerbPage — "on" chevron and colour', () => {
  it('on chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    const header = screen.getByText('on').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('on particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('on')).toHaveClass('text-blue-600');
  });

  it('on particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText('on')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "on" card view (default image)', () => {
  it('all 5 examples visible without expanding cards', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/"I put on my suit for the management interview\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company put on a great training event for new developers\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He put on three kilos during the holidays\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Could you put the projector on for the presentation\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"She isn't really angry; she's just putting it on\."/i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('on');
    expect(getCard(/To dress oneself in clothing/i)).toHaveClass('cursor-default');
    expect(getCard(/To organize a performance or event/i)).toHaveClass('cursor-default');
    expect(getCard(/To gain weight/i)).toHaveClass('cursor-default');
    expect(getCard(/To turn on a machine or appliance/i)).toHaveClass('cursor-default');
    expect(getCard(/To pretend to have a feeling or attitude/i)).toHaveClass('cursor-default');
  });

  it('no "on" card renders an image regardless of clicks', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To dress oneself in clothing/i));
    fireEvent.click(getCard(/To organize a performance or event/i));
    fireEvent.click(getCard(/To gain weight/i));
    fireEvent.click(getCard(/To turn on a machine or appliance/i));
    fireEvent.click(getCard(/To pretend to have a feeling or attitude/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
