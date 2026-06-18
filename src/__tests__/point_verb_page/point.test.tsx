import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- ahead_forward ---

describe('PointVerbPage — "ahead / forward" section definitions', () => {
  it('renders definition for looking toward or indicating the future', () => {
    renderPage();
    expandSection('ahead / forward');
    expect(screen.getByText(/To look toward or indicate the future/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead / forward');
    expect(screen.getByText(/To look toward or indicate the future/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead / forward');
    expect(screen.getByText(/To look toward or indicate the future/i)).toHaveAttribute(
      'title',
      'To look toward or indicate the future.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead / forward', 'pointAhead_section_expanded', /To look toward or indicate the future/i, renderPage);

describeChevronAndColour(LABEL, 'ahead / forward', renderPage);

describeDefaultImageCards(LABEL, 'ahead / forward', 'pointAhead', /To look toward or indicate the future/i, /This new business model points forward/i, renderPage, getCard);

// --- back ---

describe('PointVerbPage — "back" section definitions', () => {
  it('renders definition for showing connection to a past event', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To show that something is connected to a past event/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To show that something is connected to a past event/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To show that something is connected to a past event/i)).toHaveAttribute(
      'title',
      'To show that something is connected to a past event, or to remind someone of the past.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'pointBack_section_expanded', /To show that something is connected to a past event/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'pointBack', /To show that something is connected to a past event/i, /Most of these software bugs point back/i, renderPage, getCard);

// --- off ---

describe('PointVerbPage — "off" section definitions', () => {
  it('renders definition for separating numbers with a decimal point', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To separate numbers with a decimal point/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To separate numbers with a decimal point/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To separate numbers with a decimal point/i)).toHaveAttribute(
      'title',
      'To separate numbers with a decimal point (used mainly in mathematics and accounting).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'pointOff_section_expanded', /To separate numbers with a decimal point/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'pointOff', /To separate numbers with a decimal point/i, /When calculating the final cost, remember to point off/i, renderPage, getCard);

// --- out ---

describe('PointVerbPage — "out" section definitions', () => {
  it('renders definition for telling someone a fact they did not know', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To tell someone a fact they did not know or had forgotten/i)).toBeInTheDocument();
  });

  it('renders definition for directing attention using your finger', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To direct attention to someone or something using your finger/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To tell someone a fact they did not know or had forgotten/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To tell someone a fact they did not know or had forgotten/i)).toHaveAttribute(
      'title',
      'To tell someone a fact they did not know or had forgotten.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'pointOut_section_expanded', /To tell someone a fact they did not know or had forgotten/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'pointOut', /To tell someone a fact they did not know or had forgotten/i, /The lead developer pointed out/i, renderPage, getCard);

// --- to ---

describe('PointVerbPage — "to" section definitions', () => {
  it('renders definition for mentioning something as proof', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To mention something as proof or as a reason why something happened/i)).toBeInTheDocument();
  });

  it('renders definition for suggesting a situation is likely', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To suggest that a particular situation or result is likely/i)).toBeInTheDocument();
  });

  it('renders definition for physically aiming at something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To physically aim your finger or an object at something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To mention something as proof or as a reason why something happened/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To mention something as proof or as a reason why something happened/i)).toHaveAttribute(
      'title',
      'To mention something as proof or as a reason why something happened.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'pointTo_section_expanded', /To mention something as proof or as a reason why something happened/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'pointTo', /To mention something as proof or as a reason why something happened/i, /The CEO pointed to the new marketing strategy/i, renderPage, getCard);

// --- up ---

describe('PointVerbPage — "up" section definitions', () => {
  it('renders definition for emphasizing something or making a problem easier to notice', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To emphasize something or make a problem easier to notice/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To emphasize something or make a problem easier to notice/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To emphasize something or make a problem easier to notice/i)).toHaveAttribute(
      'title',
      'To emphasize something or make a problem easier to notice (similar to "highlight").'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'pointUp_section_expanded', /To emphasize something or make a problem easier to notice/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'pointUp', /To emphasize something or make a problem easier to notice/i, /The recent system crash points up/i, renderPage, getCard);
