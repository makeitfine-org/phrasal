import MakeVerbPage from '../../pages/make/MakeVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(MakeVerbPage);
