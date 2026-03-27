import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentLocale } from './components/DocumentLocale';
import { DynamicFavicon } from './components/DynamicFavicon';
import { LocaleProvider } from './context/LocaleContext';
import { PortfolioLayout } from './components/PortfolioLayout';
import { CasePage } from './pages/CasePage';

function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <DynamicFavicon />
        <DocumentLocale />
        <Routes>
          <Route path="/" element={<PortfolioLayout />} />
          <Route path="/cases/:caseSlug" element={<CasePage />} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>
  );
}

export default App;
