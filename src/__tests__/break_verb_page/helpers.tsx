import BreakVerbPage from '../../pages/break/BreakVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(BreakVerbPage);
