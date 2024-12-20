import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const PostListItem = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8'>
      <div className='md:hidden xl:block xl:w-1/3'>
        <Image 
          src="postImg.jpeg"
          className="rounded-2xl object-cover"
          w="735"
        />
      </div>
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to="/test" className='text-4xl font-semibold'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm className="text-blue-800"'>
          <span>Written by</span>
          <Link className="text-blue-800">Jhon Doe</Link>
          <span>on</span>
          <Link className="text-blue-800">Web Design</Link>
          <span> 2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. 
          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
          Praesent libero. Sed cursus ante dapibus
        </p>
        <Link 
          to="/test" 
          className='underline text-blue-800 text-sm'
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export default PostListItem