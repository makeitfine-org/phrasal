import TalkVerbPage from '../../pages/talk/TalkVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(TalkVerbPage);
