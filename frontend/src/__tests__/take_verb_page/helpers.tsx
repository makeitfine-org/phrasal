import TakeVerbPage from '../../pages/take/TakeVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(TakeVerbPage);
