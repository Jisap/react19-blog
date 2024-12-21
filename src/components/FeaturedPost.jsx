import { Link } from 'react-router-dom';
import Image from './Image';

const FeaturedPost = () => {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      {/* First */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        <Image 
          src="featured1.jpeg"
          className="rounded-3xl object-cover"
        />
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link className='text-blue-800 lg:text-lg'>Web Design</Link>
          <span className='text-gray-500'>2 days ago</span>
        </div>
        <Link to="/test" className='text-xl lg:text-3xl font-semibold lg:font-bold'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </Link>
      </div>

      {/* Others */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'></div>
    </div>
  )
}

export default FeaturedPost;