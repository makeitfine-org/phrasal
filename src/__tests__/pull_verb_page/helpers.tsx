import PullVerbPage from '../../pages/pull/PullVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(PullVerbPage);
