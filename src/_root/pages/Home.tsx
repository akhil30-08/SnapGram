import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const { toast } = useToast();

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isPostError,
  } = useGetRecentPosts();

  if (isPostError) {
    return toast({
      title: 'An error occurred! Please try again.',
    });
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>

          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 w-full items-center'>
              {posts?.documents.map((post: Models.Document) => {
                return (
                  <li key={post.$id}>
                    <PostCard post={post} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
