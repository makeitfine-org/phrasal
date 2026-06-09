import DealVerbPage from '../../pages/deal/DealVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(DealVerbPage);
