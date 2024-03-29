import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import { formatDate } from '@/lib/utils';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  return (
    <div className='post-card mb-4'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile-logo'
              className='rounded-full w-12 lg:h-12 '
            />
          </Link>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>{post.creator.name}</p>
            <div className='flex-center gap-1 sm:gap-3 text-light-3'>
              <p className='date-location subtle-semibold lg:small-regular'>
                {formatDate(post?.$createdAt)}
              </p>
              <p className='subtle-semibold lg:small-regular truncate'>{post.location}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}
        >
          <img src='/assets/icons/edit.svg' alt='edit' height={20} width={20} />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className='small-medium lg:base-medium py-5'>
          <p>{post.caption}</p>

          {post.tags.join('') && (
            <ul className='flex gap-1 mt-2'>
              {post.tags.map((tag: string) => (
                <li className='text-light-3' key={tag}>
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <img
          src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt='post-image'
          className='post-card_img'
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
