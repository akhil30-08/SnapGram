import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import './global.css';
import { Routes, Route } from 'react-router-dom';
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from './_root/pages/index';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from './components/ui/ScrollToTop';
import { ThemeProvider } from './components/shared/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
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
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:id' element={<EditPost />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/profile/:id/*' element={<Profile />} />
            <Route path='/update-profile/:id/' element={<UpdateProfile />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
    </ThemeProvider>
  );
}

export default App;
