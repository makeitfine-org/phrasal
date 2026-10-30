import React from 'react';
import { render, screen } from '@testing-library/react';
import PasswordRequirements from '../components/PasswordRequirements';

const met = (id: string) => screen.getByTestId(`password-rule-${id}`).getAttribute('data-met');

describe('PasswordRequirements', () => {
  it('renders the rules, the tip and the given id', () => {
    render(<PasswordRequirements id="box" password="" email="" />);
    expect(screen.getByTestId('password-requirements')).toHaveAttribute('id', 'box');
    expect(screen.getByTestId('password-tip')).toBeInTheDocument();
    expect(met('min-length')).toBe('false');
    expect(met('max-bytes')).toBe('true');
  });

  it('marks the rules as met or unmet as the password changes', () => {
    const { rerender } = render(<PasswordRequirements id="box" password="short" email="a@b.co" />);
    expect(met('min-length')).toBe('false');
    rerender(<PasswordRequirements id="box" password="long-enough-password" email="a@b.co" />);
    expect(met('min-length')).toBe('true');
    rerender(<PasswordRequirements id="box" password={'x'.repeat(80)} email="a@b.co" />);
    expect(met('max-bytes')).toBe('false');
  });

  it('has no email rule without an email', () => {
    render(<PasswordRequirements id="box" password="long-enough-password" />);
    expect(screen.queryByTestId('password-rule-no-email')).not.toBeInTheDocument();
  });

  it('has the email rule with an email, unmet when the password contains it', () => {
    render(<PasswordRequirements id="box" password="my-janedoe-password" email="janedoe@x.org" />);
    expect(met('no-email')).toBe('false');
  });

  it('says the breach check happens on save, and never marks it as met', () => {
    render(<PasswordRequirements id="box" password="long-enough-password" email="a@b.co" />);
    const note = screen.getByTestId('password-breach-note');
    expect(note).toHaveTextContent('Not found in known data breaches (checked when you save)');
    expect(note).not.toHaveAttribute('data-met');
  });
});
