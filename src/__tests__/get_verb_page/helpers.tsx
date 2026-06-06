import GetVerbPage from '../../pages/get/GetVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(GetVerbPage);
