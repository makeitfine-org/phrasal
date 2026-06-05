import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetVerbPage from '../pages/get/GetVerbPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <GetVerbPage />
    </MemoryRouter>
  );
}

describe('GetVerbPage', () => {
  it('renders "Get off" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get off' })).toBeInTheDocument();
  });

  it('renders all 4 numbered meanings', () => {
    renderPage();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders definition for leaving transport', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });

  it('renders definition for finishing work', () => {
    renderPage();
    expect(screen.getByText(/To finish work/i)).toBeInTheDocument();
  });

  it('renders definition for escaping punishment', () => {
    renderPage();
    expect(screen.getByText(/To escape punishment/i)).toBeInTheDocument();
  });

  it('renders definition for sending something', () => {
    renderPage();
    expect(screen.getByText(/To send something/i)).toBeInTheDocument();
  });

  it('renders all 4 example sentences', () => {
    renderPage();
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I usually get off work at 5:00 PM\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The manager made a huge mistake, but he got off with just a warning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will get this report off to the client before the end of the day\."/i)).toBeInTheDocument();
  });

  it('renders 4 images', () => {
    renderPage();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);
  });
});
