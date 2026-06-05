import { screen, fireEvent } from '@testing-library/react';
import { renderPage } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — general', () => {
  it('renders "Make" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Make' })).toBeInTheDocument();
  });

  it('does not render subtitle text on initial load', () => {
    renderPage();
    expect(screen.queryByText(/To chase someone or something/i)).not.toBeInTheDocument();
  });

  it('renders correct numbered badges across all sections when expanded', () => {
    renderPage();
    ['after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with']
      .forEach(p => fireEvent.click(screen.getByText(p)));
    expect(screen.getAllByText('1')).toHaveLength(10);
    expect(screen.getAllByText('2')).toHaveLength(4);
    expect(screen.getAllByText('3')).toHaveLength(2);
    expect(screen.getAllByText('4')).toHaveLength(2);
    expect(screen.getAllByText('5')).toHaveLength(1);
    expect(screen.getAllByText('6')).toHaveLength(1);
  });
});
