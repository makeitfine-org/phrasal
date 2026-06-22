import LeaveVerbPage from '../../pages/leave/LeaveVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(LeaveVerbPage);
