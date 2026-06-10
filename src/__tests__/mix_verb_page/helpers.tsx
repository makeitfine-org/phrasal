import MixVerbPage from '../../pages/mix/MixVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(MixVerbPage);
