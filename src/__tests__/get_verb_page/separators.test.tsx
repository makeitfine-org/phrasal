import { renderPage, getSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — section separators', () => {
  it('renders six horizontal rule separators', () => {
    renderPage();
    expect(document.querySelectorAll('hr')).toHaveLength(6);
  });

  it('all separators have border-gray-600 class', () => {
    renderPage();
    document.querySelectorAll('hr').forEach(hr => {
      expect(hr).toHaveClass('border-gray-600');
    });
  });

  it('first separator appears between off and on sections in DOM order', () => {
    renderPage();
    const [hr1] = document.querySelectorAll('hr');
    const offSection = getSection('off');
    const onSection = getSection('on');
    expect(offSection.compareDocumentPosition(hr1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr1.compareDocumentPosition(onSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('second separator appears between on and up sections in DOM order', () => {
    renderPage();
    const [, hr2] = document.querySelectorAll('hr');
    const onSection = getSection('on');
    const upSection = getSection('up');
    expect(onSection.compareDocumentPosition(hr2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr2.compareDocumentPosition(upSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('third separator appears between up and down sections in DOM order', () => {
    renderPage();
    const [,, hr3] = document.querySelectorAll('hr');
    const upSection = getSection('up');
    const downSection = getSection('down');
    expect(upSection.compareDocumentPosition(hr3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr3.compareDocumentPosition(downSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fourth separator appears between down and in sections in DOM order', () => {
    renderPage();
    const [,,, hr4] = document.querySelectorAll('hr');
    const downSection = getSection('down');
    const inSection = getSection('in');
    expect(downSection.compareDocumentPosition(hr4) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr4.compareDocumentPosition(inSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fifth separator appears between in and into sections in DOM order', () => {
    renderPage();
    const [,,,, hr5] = document.querySelectorAll('hr');
    const inSection = getSection('in');
    const intoSection = getSection('into');
    expect(inSection.compareDocumentPosition(hr5) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr5.compareDocumentPosition(intoSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('sixth separator appears between into and out sections in DOM order', () => {
    renderPage();
    const [,,,,, hr6] = document.querySelectorAll('hr');
    const intoSection = getSection('into');
    const outSection = getSection('out');
    expect(intoSection.compareDocumentPosition(hr6) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr6.compareDocumentPosition(outSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('GetVerbPage — section spacing', () => {
  it('"off" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('off')).toHaveClass('mb-5');
  });

  it('"on" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('on')).toHaveClass('mb-5');
  });

  it('"off" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('off')).not.toHaveClass('mb-10');
  });

  it('"on" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('on')).not.toHaveClass('mb-10');
  });
});
