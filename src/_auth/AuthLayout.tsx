import { log } from 'console';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;

  const location = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section
            className={`flex flex-1 items-center ${
              location.pathname === '/sign-up' ? 'justify-center' : ''
            } flex-col py-5 xl:justify-center`}
          >
            <Outlet />
          </section>

          <img
            src='/assets/images/side-img.svg'
            alt='side-image'
            className={`hidden lg:block ${
              location.pathname === '/sign-up' ? 'min-h-full' : 'max-h-screen'
            } w-1/2 object-cover bg-no-repeat`}
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
