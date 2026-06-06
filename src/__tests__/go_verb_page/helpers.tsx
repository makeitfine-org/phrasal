import GoVerbPage from '../../pages/go/GoVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(GoVerbPage);
