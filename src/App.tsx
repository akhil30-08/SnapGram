import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import './global.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './_root/pages/index';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <main className='flex'>
      <ScrollToTop />

      <Routes>
        <Route element={<AuthLayout />}>
          {/* Public Routes */}
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          {/* Private Routes */}
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
