import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from '@/pages/landing/LandingPage';
import { PackagesPage } from '@/pages/packages/PackagesPage';
import { SnackbarProvider } from '@/components/ui/SnackbarProvider';

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/packages" element={<PackagesPage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
