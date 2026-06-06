import GiveVerbPage from '../../pages/give/GiveVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(GiveVerbPage);
