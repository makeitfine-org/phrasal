import PutVerbPage from '../../pages/put/PutVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(PutVerbPage);
