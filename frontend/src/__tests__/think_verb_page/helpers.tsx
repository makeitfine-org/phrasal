import ThinkVerbPage from '../../pages/think/ThinkVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(ThinkVerbPage);
