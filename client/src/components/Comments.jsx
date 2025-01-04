import React from 'react'
import { useAuth, useUser } from "@clerk/clerk-react";
import Comment from './Comment'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({postId}) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId], // petición a la API /comments/:slug
    queryFn: () => fetchComments(postId),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Comment not found!";

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <div className='flex items-center justify-between gap-8 w-full'>
        <textarea 
          placeholder='Add a comment...'
          className='w-full p-4 rounded-xl'
        />
        <button className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl'>
          Send
        </button>
      </div>

      {data.map((comment) => (
        <Comment 
          key={comment._id} 
          comment={comment} 
          postId={postId} 
        />
      ))}
    </div>
  )
}

export default Comments