import React from 'react'
import { useAuth, useUser } from "@clerk/clerk-react";
import Comment from './Comment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId], // petición a la API /comments/:slug
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.response.data);
    }
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get('desc'),
    }  
    
    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form 
        onSubmit={handleSubmit}
        className='flex items-center justify-between gap-8 w-full'
      >
        <textarea 
          name="desc"
          placeholder='Add a comment...'
          className='w-full p-4 rounded-xl'
        />
        <button className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl'>
          Send
        </button>
      </form>

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