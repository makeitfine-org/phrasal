import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'MixVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- down ---

describe('MixVerbPage — "down" section definitions', () => {
  it('renders definition for combining sound tracks into a final track', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In audio engineering and music production, to combine multiple individual sound tracks/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In audio engineering and music production, to combine multiple individual sound tracks/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In audio engineering and music production, to combine multiple individual sound tracks/i)).toHaveAttribute(
      'title',
      'In audio engineering and music production, to combine multiple individual sound tracks into one final stereo or mono track.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'mixDown_section_expanded', /In audio engineering and music production, to combine multiple individual sound tracks/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'mixDown', /In audio engineering and music production, to combine multiple individual sound tracks/i, /After recording the vocals and instruments, the sound engineer will mix down the project\./i, renderPage, getCard);

// --- in_into ---

describe('MixVerbPage — "in / into" section definitions', () => {
  it('renders definition for putting a substance into a mixture', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put a new substance into an existing mixture and stir it/i)).toBeInTheDocument();
  });

  it('renders definition for joining a group and interacting naturally', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To join a group of people and interact with them naturally/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put a new substance into an existing mixture and stir it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put a new substance into an existing mixture and stir it/i)).toHaveAttribute(
      'title',
      'To put a new substance into an existing mixture and stir it.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'mixIn_section_expanded', /To put a new substance into an existing mixture and stir it/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'mixIn', /To put a new substance into an existing mixture and stir it/i, /Add the sugar to the bowl and mix it in slowly\./i, renderPage, getCard);

// --- together ---

describe('MixVerbPage — "together" section definitions', () => {
  it('renders definition for blending items into a single substance or group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To blend two or more items so that they become a single substance or group/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To blend two or more items so that they become a single substance or group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To blend two or more items so that they become a single substance or group/i)).toHaveAttribute(
      'title',
      'To blend two or more items so that they become a single substance or group.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'mixTogether_section_expanded', /To blend two or more items so that they become a single substance or group/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'mixTogether', /To blend two or more items so that they become a single substance or group/i, /In software development, you cannot easily mix together two completely different programming architectures\./i, renderPage, getCard);

// --- up ---

describe('MixVerbPage — "up" section definitions', () => {
  it('renders definition for confusing two similar things or people', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To confuse two things or people by thinking that one person or thing is another/i)).toBeInTheDocument();
  });

  it('renders definition for making a mixture by combining ingredients', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a mixture by combining different ingredients/i)).toBeInTheDocument();
  });

  it('renders definition for doing something differently to make it more interesting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To do something differently to make it more interesting/i)).toBeInTheDocument();
  });

  it('renders definition for being involved in something illegal or complicated', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be connected to or involved in something illegal/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To confuse two things or people by thinking that one person or thing is another/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To confuse two things or people by thinking that one person or thing is another/i)).toHaveAttribute(
      'title',
      'To confuse two things or people by thinking that one person or thing is another because they are similar.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'mixUp_section_expanded', /To confuse two things or people by thinking that one person or thing is another/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'mixUp', /To confuse two things or people by thinking that one person or thing is another/i, /I always mix up the two brothers because they look exactly the same\./i, renderPage, getCard);

// --- with ---

describe('MixVerbPage — "with" section definitions', () => {
  it('renders definition for spending time talking to different people at a social event', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time talking to different people, usually at a social event/i)).toBeInTheDocument();
  });

  it('renders definition for putting two or more substances together', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put two or more substances together/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time talking to different people, usually at a social event/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time talking to different people, usually at a social event/i)).toHaveAttribute(
      'title',
      'To spend time talking to different people, usually at a social event or at work.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'mixWith_section_expanded', /To spend time talking to different people, usually at a social event/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'mixWith', /To spend time talking to different people, usually at a social event/i, /A good leader needs to be able to mix with people from all departments\./i, renderPage, getCard);
