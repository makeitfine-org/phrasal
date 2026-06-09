import CarryVerbPage from '../../pages/carry/CarryVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(CarryVerbPage);
