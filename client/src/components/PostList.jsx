import React from 'react'
import PostListItem from './PostListItem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPosts = async (pageParam) => {                                 // Cada vez que se hace la petición se genera un pageParam
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
    params: {
      page: pageParam,
      limit: 2
    }
  })
  return res.data;
}

const PostList = () => {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts( pageParam ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined, // pages son los posts que se han devuelto, lastPage es el ultimo post devuelto
  })

  if (isFetching) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data);
  // data.page 1 -> posts: [1, 2]
  // data.page 2 -> posts: [3, 4]
  // data.page 3 -> posts: [5, 6]
  // [1, 2, 3, 4, 5, 6]
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];


  console.log(data);
  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  )
}

export default PostList