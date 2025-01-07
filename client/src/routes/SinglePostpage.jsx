import { Link, useParams } from 'react-router-dom'
import Image from '../components/Image'
import PostMenuAction from '../components/PostMenuAction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import { useQuery } from '@tanstack/react-query'
import { format } from "timeago.js";
import axios from 'axios'

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`); // petición a la API /posts/:slug
  return res.data; // devuelve un post
};


const SinglePostpage = () => {

  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug], 
    queryFn: () => fetchPost(slug),
  });
console.log("data.img", data);
  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  return (
    <div className='flex flex-col gap-8'>
      {/* detail */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
            {data.title}
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Writen by</span>
            <Link className='text-blue-800'>{data.user.username}</Link>
            <span>on</span>
            <Link className='text-blue-800'>{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className='text-gray-500 font-medium'>
            {data.desc}
          </p>
        </div>

        {data.img && (
          <div className='hidden lg:block w-2/5'>
            <Image
              src={data.img}
              w="600"
              className="rounded-2xl"
            />
          </div>
        )}
      </div>

      {/* content */}
      <div className='flex flex-col md:flex-row gap-12'>
        {/* text */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          <p>
            Cum convallis mus at rutrum imperdiet duis eleifend molestie vitae lacinia ornare mollis rhoncus, aliquam primis vehicula quis sagittis velit porttitor ut consequat cubilia tempor sapien, et habitant lobortis ullamcorper dis sem taciti feugiat mi placerat tristique commodo. Iaculis turpis odio mollis et facilisis suspendisse, at malesuada class volutpat bibendum dis mus, potenti nec praesent fringilla neque. Aliquam diam mattis neque vestibulum donec tincidunt leo posuere proin vivamus dictum aenean, nisl malesuada lectus tempus odio pulvinar eros ridiculus quisque nulla ullamcorper euismod dis, ac feugiat ut cras ultricies habitant duis pharetra morbi lacinia id.
          </p>
          <p>
            Cum convallis mus at rutrum imperdiet duis eleifend molestie vitae lacinia ornare mollis rhoncus, aliquam primis vehicula quis sagittis velit porttitor ut consequat cubilia tempor sapien, et habitant lobortis ullamcorper dis sem taciti feugiat mi placerat tristique commodo. Iaculis turpis odio mollis et facilisis suspendisse, at malesuada class volutpat bibendum dis mus, potenti nec praesent fringilla neque. Aliquam diam mattis neque vestibulum donec tincidunt leo posuere proin vivamus dictum aenean, nisl malesuada lectus tempus odio pulvinar eros ridiculus quisque nulla ullamcorper euismod dis, ac feugiat ut cras ultricies habitant duis pharetra morbi lacinia id.
          </p>
          <p>
            Cum convallis mus at rutrum imperdiet duis eleifend molestie vitae lacinia ornare mollis rhoncus, aliquam primis vehicula quis sagittis velit porttitor ut consequat cubilia tempor sapien, et habitant lobortis ullamcorper dis sem taciti feugiat mi placerat tristique commodo. Iaculis turpis odio mollis et facilisis suspendisse, at malesuada class volutpat bibendum dis mus, potenti nec praesent fringilla neque. Aliquam diam mattis neque vestibulum donec tincidunt leo posuere proin vivamus dictum aenean, nisl malesuada lectus tempus odio pulvinar eros ridiculus quisque nulla ullamcorper euismod dis, ac feugiat ut cras ultricies habitant duis pharetra morbi lacinia id.
          </p>
          <p>
            Cum convallis mus at rutrum imperdiet duis eleifend molestie vitae lacinia ornare mollis rhoncus, aliquam primis vehicula quis sagittis velit porttitor ut consequat cubilia tempor sapien, et habitant lobortis ullamcorper dis sem taciti feugiat mi placerat tristique commodo. Iaculis turpis odio mollis et facilisis suspendisse, at malesuada class volutpat bibendum dis mus, potenti nec praesent fringilla neque. Aliquam diam mattis neque vestibulum donec tincidunt leo posuere proin vivamus dictum aenean, nisl malesuada lectus tempus odio pulvinar eros ridiculus quisque nulla ullamcorper euismod dis, ac feugiat ut cras ultricies habitant duis pharetra morbi lacinia id.
          </p>
          <p>
            Cum convallis mus at rutrum imperdiet duis eleifend molestie vitae lacinia ornare mollis rhoncus, aliquam primis vehicula quis sagittis velit porttitor ut consequat cubilia tempor sapien, et habitant lobortis ullamcorper dis sem taciti feugiat mi placerat tristique commodo. Iaculis turpis odio mollis et facilisis suspendisse, at malesuada class volutpat bibendum dis mus, potenti nec praesent fringilla neque. Aliquam diam mattis neque vestibulum donec tincidunt leo posuere proin vivamus dictum aenean, nisl malesuada lectus tempus odio pulvinar eros ridiculus quisque nulla ullamcorper euismod dis, ac feugiat ut cras ultricies habitant duis pharetra morbi lacinia id.
          </p>
        </div>

        {/* menu */}
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>
            Author
          </h1>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-8'>
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className='text-blue-800'>
                {data.user.username}
              </Link>
            </div>
            <p className='text-sm text-gray-500'>
              aliquam primis vehicula quis sagittis velit
            </p>
            <div className='flex gap-2'>
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>

          <PostMenuAction post={data}/>

          <h1 className='mt-8 mb-4 text-sm font-medium'>
            Categories
          </h1>
          <div className='flex flex-col gap-2 text-sm'>
            <Link to="/" className='underline'>All</Link>
            <Link to="/" className='underline'>Web Design</Link>
            <Link to="/" className='underline'>Develpment</Link>
            <Link to="/" className='underline'>Databases</Link>
            <Link to="/" className='underline'>Search Engines</Link>
            <Link to="/" className='underline'>Marketing</Link>
          </div>

          <h1 className='mt-8 mb-4 text-sm font-medium'>
            Search
          </h1>
          <Search />
        </div>
      </div>

      <Comments postId={data._id} />
    </div>
  )
}

export default SinglePostpage