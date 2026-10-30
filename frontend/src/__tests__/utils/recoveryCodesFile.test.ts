import { downloadRecoveryCodes, recoveryCodesText } from '../../utils/recoveryCodesFile';

describe('recoveryCodesText', () => {
  it('has a header and every code on its own line', () => {
    const text = recoveryCodesText('a@b.co', ['AAAA-1111', 'BBBB-2222'], new Date('2026-10-30T10:00:00Z'));
    const lines = text.split('\n');
    expect(lines[0]).toBe('Phrasal recovery codes for a@b.co, created 2026-10-30; each code works once.');
    expect(lines).toContain('AAAA-1111');
    expect(lines).toContain('BBBB-2222');
  });
});

describe('downloadRecoveryCodes', () => {
  it('creates and revokes the object URL and clicks the anchor', () => {
    const create = vi.fn().mockReturnValue('blob:x');
    const revoke = vi.fn();
    Object.assign(URL, { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    downloadRecoveryCodes('codes');

    expect(create).toHaveBeenCalledOnce();
    expect(click).toHaveBeenCalledOnce();
    expect(click.mock.instances[0].download).toBe('phrasal-recovery-codes.txt');
    expect(revoke).toHaveBeenCalledWith('blob:x');
    click.mockRestore();
  });
});
