import CatchVerbPage from '../../pages/catch/CatchVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(CatchVerbPage);
