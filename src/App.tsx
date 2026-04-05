import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentLocale } from './components/DocumentLocale';
import { DynamicFavicon } from './components/DynamicFavicon';
import { LocaleProvider } from './context/LocaleContext';
import { PortfolioLayout } from './components/PortfolioLayout';

const CasePage = lazy(() => import('./pages/CasePage').then((m) => ({ default: m.CasePage })));

function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <DynamicFavicon />
        <DocumentLocale />
        <Routes>
          <Route path="/" element={<PortfolioLayout />} />
          <Route path="/cases/:caseSlug" element={<Suspense><CasePage /></Suspense>} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>
  );
}

export default App;
