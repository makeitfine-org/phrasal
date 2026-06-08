import BringVerbPage from '../../pages/bring/BringVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(BringVerbPage);
