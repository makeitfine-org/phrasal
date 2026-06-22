import BrushVerbPage from '../../pages/brush/BrushVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(BrushVerbPage);
