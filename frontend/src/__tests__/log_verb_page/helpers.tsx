import LogVerbPage from '../../pages/log/LogVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(LogVerbPage);
