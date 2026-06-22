import BlowVerbPage from '../../pages/blow/BlowVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(BlowVerbPage);
