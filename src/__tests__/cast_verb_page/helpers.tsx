import CastVerbPage from '../../pages/cast/CastVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(CastVerbPage);
