import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VerbDetailPage from '../pages/VerbDetailPage';

const mockUseVerbDetail = vi.fn();

vi.mock('../hooks/useVerbDetail', () => ({
  useVerbDetail: (...args: unknown[]) => mockUseVerbDetail(...args),
}));

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
  mockUseVerbDetail.mockReset();
});

function renderWithRoute(verb: string) {
  return render(
    <MemoryRouter initialEntries={[`/phrasal-verbs/list/${verb}`]}>
      <Routes>
        <Route path="/phrasal-verbs/list/:verb" element={<VerbDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('VerbDetailPage', () => {
  it('shows loading state', () => {
    mockUseVerbDetail.mockReturnValue({
      title: '',
      sections: [],
      loading: true,
      error: null,
    });

    renderWithRoute('get');
    const skeletonBlocks = document.querySelectorAll('.animate-pulse');
    expect(skeletonBlocks.length).toBeGreaterThan(0);
  });

  it('shows error state', () => {
    mockUseVerbDetail.mockReturnValue({
      title: '',
      sections: [],
      loading: false,
      error: 'Verb not found',
    });

    renderWithRoute('nonexistent');
    expect(screen.getByText('Verb not found')).toBeInTheDocument();
  });

  it('shows "Verb not found" when sections are empty', () => {
    mockUseVerbDetail.mockReturnValue({
      title: 'Get',
      sections: [],
      loading: false,
      error: null,
    });

    renderWithRoute('get');
    expect(screen.getByText('Verb not found')).toBeInTheDocument();
  });

  it('renders VerbPageLayout with sections on success', () => {
    mockUseVerbDetail.mockReturnValue({
      title: 'Get',
      sections: [
        {
          particle: 'off',
          storageKey: 'getOff_section_expanded',
          storageKeyPrefix: 'getOff',
          meanings: [
            { definition: 'To leave', example: 'Get off the bus.', imageSrc: '/images/default.png', imageAlt: 'alt' },
          ],
        },
      ],
      loading: false,
      error: null,
    });

    renderWithRoute('get');
    expect(screen.getByText('Get')).toBeInTheDocument();
    expect(screen.getByText('off')).toBeInTheDocument();
  });

  it('passes verb param to useVerbDetail', () => {
    mockUseVerbDetail.mockReturnValue({
      title: '', sections: [], loading: true, error: null,
    });

    renderWithRoute('act');
    expect(mockUseVerbDetail).toHaveBeenCalledWith('act');
  });
});
