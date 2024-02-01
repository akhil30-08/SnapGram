import GridPostList from '@/components/shared/GridPostList';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const posts = [];

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);
  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>

        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img
            src='/assets/icons/search.svg'
            alt='Search'
            width={24}
            height={24}
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-8 mb-5'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>

        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium'>All</p>
          <img
            src='/assets/icons/filter.svg'
            alt='filter'
            height={20}
            width={20}
          />
        </div>
      </div>

      <div className='flex flex-wrap gap-7 max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults />
        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-8 text-center w-full'>End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} post={item.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
