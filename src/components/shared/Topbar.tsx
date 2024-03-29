import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { toast } from '../ui/use-toast';
import { useUserContext } from '@/context/AuthContext';
import ModeToggle from './ModeToggle';

const Topbar = () => {
  const navigate = useNavigate();
  const { mutateAsync: signOut, isSuccess } = useSignOutAccountMutation();

  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in');
      toast({
        title: 'User Logged Out',
      });
    }
  }, [isSuccess]);

  return (
    <section className='topbar m'>
      <div className='flex-between py-4 px-3'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={130}
            height={320}
          />
        </Link>

        <div className='flex gap-2'>
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={() => signOut()}
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>

          <Link to={`/profile${user.id}`} className='flex-center gap-3'>
            <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
          </Link>

          <ModeToggle />
        </div>
      </div>
    </section>
  );
};

export default Topbar;
