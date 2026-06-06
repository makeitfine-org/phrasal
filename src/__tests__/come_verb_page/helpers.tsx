import ComeVerbPage from '../../pages/come/ComeVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(ComeVerbPage);
