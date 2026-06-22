import PickVerbPage from '../../pages/pick/PickVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(PickVerbPage);
