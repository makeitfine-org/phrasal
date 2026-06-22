import CountVerbPage from '../../pages/count/CountVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(CountVerbPage);
