import FigureVerbPage from '../../pages/figure/FigureVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(FigureVerbPage);
