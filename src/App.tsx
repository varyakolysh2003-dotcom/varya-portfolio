import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { DocumentLocale } from './components/DocumentLocale';
import { DynamicFavicon } from './components/DynamicFavicon';
import { LocaleProvider } from './context/LocaleContext';
import { LightboxProvider } from './context/LightboxContext';
import { Lightbox } from './components/Lightbox';
import { PortfolioLayout } from './components/PortfolioLayout';

const CasePage = lazy(() => import('./pages/CasePage').then((m) => ({ default: m.CasePage })));

function App() {
  return (
    <HashRouter>
      <LocaleProvider>
        <LightboxProvider>
          <DynamicFavicon />
          <DocumentLocale />
          <Routes>
            <Route path="/" element={<PortfolioLayout />} />
            <Route path="/cases/:caseSlug" element={<Suspense><CasePage /></Suspense>} />
          </Routes>
          <Lightbox />
        </LightboxProvider>
      </LocaleProvider>
    </HashRouter>
  );
}

export default App;
