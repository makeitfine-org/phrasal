import LayVerbPage from '../../pages/lay/LayVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(LayVerbPage);
