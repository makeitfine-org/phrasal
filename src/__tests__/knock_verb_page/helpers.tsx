import KnockVerbPage from '../../pages/knock/KnockVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(KnockVerbPage);
