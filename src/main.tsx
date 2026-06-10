import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import PhrasalVerbsPage from './pages/PhrasalVerbsPage';
import PhrasalVerbsListPage from './pages/PhrasalVerbsListPage';
import GetVerbPage from './pages/get/GetVerbPage';
import MakeVerbPage from './pages/make/MakeVerbPage';
import PutVerbPage from './pages/put/PutVerbPage';
import TakeVerbPage from './pages/take/TakeVerbPage';
import GiveVerbPage from './pages/give/GiveVerbPage';
import GoVerbPage from './pages/go/GoVerbPage';
import ComeVerbPage from './pages/come/ComeVerbPage';
import ActVerbPage from './pages/act/ActVerbPage';
import CutVerbPage from './pages/cut/CutVerbPage';
import BreakVerbPage from './pages/break/BreakVerbPage';
import BringVerbPage from './pages/bring/BringVerbPage';
import AskVerbPage from './pages/ask/AskVerbPage';
import BackVerbPage from './pages/back/BackVerbPage';
import BeVerbPage from './pages/be/BeVerbPage';
import BlowVerbPage from './pages/blow/BlowVerbPage';
import BrushVerbPage from './pages/brush/BrushVerbPage';
import BuildVerbPage from './pages/build/BuildVerbPage';
import CallVerbPage from './pages/call/CallVerbPage';
import CarryVerbPage from './pages/carry/CarryVerbPage';
import CatchVerbPage from './pages/catch/CatchVerbPage';
import CheckVerbPage from './pages/check/CheckVerbPage';
import CheerVerbPage from './pages/cheer/CheerVerbPage';
import CleanVerbPage from './pages/clean/CleanVerbPage';
import CountVerbPage from './pages/count/CountVerbPage';
import DealVerbPage from './pages/deal/DealVerbPage';
import DoVerbPage from './pages/do/DoVerbPage';
import DressVerbPage from './pages/dress/DressVerbPage';
import DropVerbPage from './pages/drop/DropVerbPage';
import EatVerbPage from './pages/eat/EatVerbPage';
import FallVerbPage from './pages/fall/FallVerbPage';
import FigureVerbPage from './pages/figure/FigureVerbPage';
import FillVerbPage from './pages/fill/FillVerbPage';
import FindVerbPage from './pages/find/FindVerbPage';
import GrowVerbPage from './pages/grow/GrowVerbPage';
import HandVerbPage from './pages/hand/HandVerbPage';
import HangVerbPage from './pages/hang/HangVerbPage';
import HoldVerbPage from './pages/hold/HoldVerbPage';
import KeepVerbPage from './pages/keep/KeepVerbPage';
import KnockVerbPage from './pages/knock/KnockVerbPage';
import LayVerbPage from './pages/lay/LayVerbPage';
import LeaveVerbPage from './pages/leave/LeaveVerbPage';
import LetVerbPage from './pages/let/LetVerbPage';
import LogVerbPage from './pages/log/LogVerbPage';
import MixVerbPage from './pages/mix/MixVerbPage';
import PassVerbPage from './pages/pass/PassVerbPage';
import PayVerbPage from './pages/pay/PayVerbPage';
import PickVerbPage from './pages/pick/PickVerbPage';
import PointVerbPage from './pages/point/PointVerbPage';
import ParticlesPage from './pages/particles/ParticlesPage';
import IWishPage from './pages/IWishPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import PageShell from './components/PageShell';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<PageShell><Outlet /></PageShell>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/phrasal-verbs" element={<PhrasalVerbsPage />} />
            <Route path="/phrasal-verbs/test-most-popular" element={<App />} />
            <Route path="/phrasal-verbs/particles" element={<ParticlesPage />} />
            <Route path="/phrasal-verbs/list" element={<PhrasalVerbsListPage />} />
            <Route path="/phrasal-verbs/list/get" element={<GetVerbPage />} />
            <Route path="/phrasal-verbs/list/make" element={<MakeVerbPage />} />
            <Route path="/phrasal-verbs/list/put" element={<PutVerbPage />} />
            <Route path="/phrasal-verbs/list/take" element={<TakeVerbPage />} />
            <Route path="/phrasal-verbs/list/give" element={<GiveVerbPage />} />
            <Route path="/phrasal-verbs/list/go" element={<GoVerbPage />} />
            <Route path="/phrasal-verbs/list/come" element={<ComeVerbPage />} />
            <Route path="/phrasal-verbs/list/act" element={<ActVerbPage />} />
            <Route path="/phrasal-verbs/list/cut" element={<CutVerbPage />} />
            <Route path="/phrasal-verbs/list/break" element={<BreakVerbPage />} />
            <Route path="/phrasal-verbs/list/bring" element={<BringVerbPage />} />
            <Route path="/phrasal-verbs/list/ask" element={<AskVerbPage />} />
            <Route path="/phrasal-verbs/list/back" element={<BackVerbPage />} />
            <Route path="/phrasal-verbs/list/be" element={<BeVerbPage />} />
            <Route path="/phrasal-verbs/list/blow" element={<BlowVerbPage />} />
            <Route path="/phrasal-verbs/list/brush" element={<BrushVerbPage />} />
            <Route path="/phrasal-verbs/list/build" element={<BuildVerbPage />} />
            <Route path="/phrasal-verbs/list/call" element={<CallVerbPage />} />
            <Route path="/phrasal-verbs/list/carry" element={<CarryVerbPage />} />
            <Route path="/phrasal-verbs/list/catch" element={<CatchVerbPage />} />
            <Route path="/phrasal-verbs/list/check" element={<CheckVerbPage />} />
            <Route path="/phrasal-verbs/list/cheer" element={<CheerVerbPage />} />
            <Route path="/phrasal-verbs/list/clean" element={<CleanVerbPage />} />
            <Route path="/phrasal-verbs/list/count" element={<CountVerbPage />} />
            <Route path="/phrasal-verbs/list/deal" element={<DealVerbPage />} />
            <Route path="/phrasal-verbs/list/do" element={<DoVerbPage />} />
            <Route path="/phrasal-verbs/list/dress" element={<DressVerbPage />} />
            <Route path="/phrasal-verbs/list/drop" element={<DropVerbPage />} />
            <Route path="/phrasal-verbs/list/eat" element={<EatVerbPage />} />
            <Route path="/phrasal-verbs/list/fall" element={<FallVerbPage />} />
            <Route path="/phrasal-verbs/list/figure" element={<FigureVerbPage />} />
            <Route path="/phrasal-verbs/list/fill" element={<FillVerbPage />} />
            <Route path="/phrasal-verbs/list/find" element={<FindVerbPage />} />
            <Route path="/phrasal-verbs/list/grow" element={<GrowVerbPage />} />
            <Route path="/phrasal-verbs/list/hand" element={<HandVerbPage />} />
            <Route path="/phrasal-verbs/list/hang" element={<HangVerbPage />} />
            <Route path="/phrasal-verbs/list/hold" element={<HoldVerbPage />} />
            <Route path="/phrasal-verbs/list/keep" element={<KeepVerbPage />} />
            <Route path="/phrasal-verbs/list/knock" element={<KnockVerbPage />} />
            <Route path="/phrasal-verbs/list/lay" element={<LayVerbPage />} />
            <Route path="/phrasal-verbs/list/leave" element={<LeaveVerbPage />} />
            <Route path="/phrasal-verbs/list/let" element={<LetVerbPage />} />
            <Route path="/phrasal-verbs/list/log" element={<LogVerbPage />} />
            <Route path="/phrasal-verbs/list/mix" element={<MixVerbPage />} />
            <Route path="/phrasal-verbs/list/pass" element={<PassVerbPage />} />
            <Route path="/phrasal-verbs/list/pay" element={<PayVerbPage />} />
            <Route path="/phrasal-verbs/list/pick" element={<PickVerbPage />} />
            <Route path="/phrasal-verbs/list/point" element={<PointVerbPage />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/grammar/i-wish-if-only" element={<IWishPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
