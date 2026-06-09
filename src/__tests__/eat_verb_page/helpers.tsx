import EatVerbPage from '../../pages/eat/EatVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(EatVerbPage);
