import { renderPage, getSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('MakeVerbPage — section separators', () => {
  it('renders nine horizontal rule separators', () => {
    renderPage();
    expect(document.querySelectorAll('hr')).toHaveLength(9);
  });

  it('all separators have border-gray-600 class', () => {
    renderPage();
    document.querySelectorAll('hr').forEach(hr => {
      expect(hr).toHaveClass('border-gray-600');
    });
  });

  it('first separator appears between after and away sections in DOM order', () => {
    renderPage();
    const [hr1] = document.querySelectorAll('hr');
    const afterSection = getSection('after');
    const awaySection = getSection('away (with)');
    expect(afterSection.compareDocumentPosition(hr1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr1.compareDocumentPosition(awaySection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('second separator appears between away and for sections in DOM order', () => {
    renderPage();
    const [, hr2] = document.querySelectorAll('hr');
    const awaySection = getSection('away (with)');
    const forSection = getSection('for');
    expect(awaySection.compareDocumentPosition(hr2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr2.compareDocumentPosition(forSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('third separator appears between for and into sections in DOM order', () => {
    renderPage();
    const [,, hr3] = document.querySelectorAll('hr');
    const forSection = getSection('for');
    const intoSection = getSection('into');
    expect(forSection.compareDocumentPosition(hr3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr3.compareDocumentPosition(intoSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fourth separator appears between into and off sections in DOM order', () => {
    renderPage();
    const [,,, hr4] = document.querySelectorAll('hr');
    const intoSection = getSection('into');
    const offSection = getSection('off (with)');
    expect(intoSection.compareDocumentPosition(hr4) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr4.compareDocumentPosition(offSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fifth separator appears between off and out sections in DOM order', () => {
    renderPage();
    const [,,,, hr5] = document.querySelectorAll('hr');
    const offSection = getSection('off (with)');
    const outSection = getSection('out');
    expect(offSection.compareDocumentPosition(hr5) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr5.compareDocumentPosition(outSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('sixth separator appears between out and over sections in DOM order', () => {
    renderPage();
    const [,,,,, hr6] = document.querySelectorAll('hr');
    const outSection = getSection('out');
    const overSection = getSection('over');
    expect(outSection.compareDocumentPosition(hr6) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr6.compareDocumentPosition(overSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('MakeVerbPage — section spacing', () => {
  it('"after" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('after')).toHaveClass('mb-5');
  });

  it('"for" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('for')).toHaveClass('mb-5');
  });

  it('"after" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('after')).not.toHaveClass('mb-10');
  });
});
