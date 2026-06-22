import CutVerbPage from '../../pages/cut/CutVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(CutVerbPage);
