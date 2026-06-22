import PassVerbPage from '../../pages/pass/PassVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(PassVerbPage);
