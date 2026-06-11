import TryVerbPage from '../../pages/try/TryVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(TryVerbPage);
