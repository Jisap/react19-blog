import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Upload from '../components/Upload';




const Write = () => {

  const { isLoaded, isSignedIn} = useUser();
  const [value, setValue] = useState('');
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [cover, setCover] = useState();
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState();
  const [video, setVideo] = useState();

  useEffect(() => {
    console.log("img desde el useEffect",img);
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);  // Si la imagen cambia se añade la imagen al texto como un <image 
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async(newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`)
    }
  })

  if(!isLoaded) {
    return <div>Loading...</div>
  }

  if(isLoaded && !isSignedIn) {
    return <div>Please sign in</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover ? cover.filePath : "",
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value
    }

    console.log(data);
    mutation.mutate(data)
  }


  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-xl font-light'>
        Create a New Post
      </h1>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 flex-1 mb-6'
      >
        <Upload 
          type="image"
          setProgress={setProgress}
          setData={setCover}
        >
          <button 
            type="button"
            className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'
          >
            Add a cover image
          </button>
        </Upload>
       
        <input 
          type="text" 
          placeholder="My Awesome Story" 
          className='text-4xl font-semibold bg-transparent outline-none'
          name="title"
        />
        <div className='flex items-center gap-4'>
          <label 
            htmlFor="" 
            className='text-sm'
          >
            Choose a category
          </label>
          <select 
            name="category" 
            id="" 
            className='p-2 rounded-xl bg-white shadow-md'
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea 
          name="desc" 
          placeholder="A short description"
          className='p-4 rounded-xl bg-white shadow-md'
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload                                       // Sube la imagen y establece el state de img -> useEffect -> setValue -> <ReactQuill />
              type="image" 
              setProgress={setProgress} 
              setData={setImg}
            >
              🌆
            </Upload>
            <Upload 
              type="video" 
              setProgress={setProgress} 
              setData={setVideo}
            >
              ▶️
            </Upload>
          </div>
          <ReactQuill 
            theme="snow" 
            className='flex-1 rounded-xl bg-white shadow-md'
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          /> 
        </div>
        <button 
          className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'
          disabled={mutation.isPending || (0 < progress && progress < 100)}
        >
          {mutation.isPending ? 'Loading...' : 'Send'}
        </button>

        {"Progress: " + progress + "%"}

        {mutation.isError && (
          <div className='text-red-500 text-sm'>
            <span>
              {mutation.error.message}
            </span>
          </div>
        )}
      </form>
    </div>
  )
}

export default Write