import ThrowVerbPage from '../../pages/throw/ThrowVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(ThrowVerbPage);
