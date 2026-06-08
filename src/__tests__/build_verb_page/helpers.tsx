import BuildVerbPage from '../../pages/build/BuildVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(BuildVerbPage);
