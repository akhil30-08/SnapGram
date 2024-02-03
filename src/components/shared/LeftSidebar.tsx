import { useUserContext } from '@/context/AuthContext';
import { useState } from 'react';
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '../ui/use-toast';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Button } from '../ui/button';
import LoadingBar from 'react-top-loading-bar';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  const {
    mutateAsync: signOut,
    isSuccess,
    isPending,
  } = useSignOutAccountMutation();

  const { user } = useUserContext();

  useEffect(() => {
    if (isPending) setProgress(20);

    if (isSuccess) {
      navigate('/sign-in');
      toast({
        title: 'User Logged Out',
      });
    }
  }, [isSuccess]);

  return (
    <nav className='leftsidebar'>
      <LoadingBar
        color='#f11946'
        onLoaderFinished={() => setProgress(0)}
        progress={progress}
      />
      <div className='flex flex-col gap-8'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={150}
            height={37}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-14 w-14 rounded-full'
          />

          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>

        <ul className='flex flex-col gap-2'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname == link.route ? true : false;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className='flex items-center p-3 gap-4'
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {link.label}{' '}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant='ghost'
        className='shad-button_logout justify-start mt-3 transition'
        onClick={() => signOut()}
      >
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium md:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
