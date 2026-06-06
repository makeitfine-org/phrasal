import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'on', 'putOn_section_expanded', /To dress oneself in clothing/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describe('PutVerbPage — "on" card view', () => {
  it('all 5 examples visible without expanding cards', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/"I put on my suit for the management interview\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company put on a great training event for new developers\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He put on three kilos during the holidays\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Could you put the projector on for the presentation\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"She isn't really angry; she's just putting it on\."/i)).toBeInTheDocument();
  });

  it('no "on" card renders an image regardless of clicks', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To dress oneself in clothing/i));
    fireEvent.click(getCard(/To organize a performance or event/i));
    fireEvent.click(getCard(/To gain weight/i));
    fireEvent.click(getCard(/To turn on a machine or appliance/i));
    fireEvent.click(getCard(/To pretend to have a feeling or attitude/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'on', 'putOn', /To dress oneself in clothing/i, /"I put on my suit/i, renderPage, getCard);
