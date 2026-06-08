import ActVerbPage from '../../pages/act/ActVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(ActVerbPage);
