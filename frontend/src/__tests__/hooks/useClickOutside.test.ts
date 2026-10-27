import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useClickOutside } from '../../hooks/useClickOutside';

describe('useClickOutside', () => {
  it('calls the handler for a mousedown outside the element', () => {
    const inside = document.createElement('div');
    document.body.append(inside);
    const handler = vi.fn();
    renderHook(() => useClickOutside({ current: inside }, handler));
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
    inside.remove();
  });

  it('ignores a mousedown inside the element', () => {
    const inside = document.createElement('div');
    document.body.append(inside);
    const handler = vi.fn();
    renderHook(() => useClickOutside({ current: inside }, handler));
    fireEvent.mouseDown(inside);
    expect(handler).not.toHaveBeenCalled();
    inside.remove();
  });
});
