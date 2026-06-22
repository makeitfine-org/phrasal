import LookVerbPage from '../../pages/look/LookVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(LookVerbPage);
