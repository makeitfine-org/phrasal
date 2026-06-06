import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'in', 'putIn_section_expanded', /To spend time or effort on something/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describe('PutVerbPage — "in" card view (default image)', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/"The development team put in 50 hours a week/i)).toBeInTheDocument();
    expect(screen.getByText(/"We are putting in a new server system today\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put in a request for more holiday time\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I think we should test the code first," the junior developer put in\./i)).toBeInTheDocument();
  });

  it('all cards have cursor-default class', () => {
    renderPage();
    expandSection('in');
    expect(getCard(/To spend time or effort on something/i)).toHaveClass('cursor-default');
    expect(getCard(/To install an appliance or system/i)).toHaveClass('cursor-default');
    expect(getCard(/To officially submit a request or document/i)).toHaveClass('cursor-default');
    expect(getCard(/To interrupt a conversation with a remark/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To spend time or effort on something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
