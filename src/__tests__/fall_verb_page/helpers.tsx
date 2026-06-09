import FallVerbPage from '../../pages/fall/FallVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(FallVerbPage);
