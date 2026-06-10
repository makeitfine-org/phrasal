import PayVerbPage from '../../pages/pay/PayVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';

export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(PayVerbPage);
