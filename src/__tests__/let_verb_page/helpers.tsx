import LetVerbPage from '../../pages/let/LetVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(LetVerbPage);
