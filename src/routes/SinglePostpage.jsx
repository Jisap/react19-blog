import { Link } from 'react-router-dom'
import Image from '../components/Image'

const SinglePostpage = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* detail */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam modi eum aut.</h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Writen by</span>
            <Link>Jhon Doe</Link>
            <span>on</span>
            <Link>Web Design</Link>
            <span>2 days ago</span>
          </div>
        </div>
        <div className='hidden lg:block w-2/5'>
          <Image 
            src="postImg.jpeg"

          />
        </div>
      </div>
      {/* content */}
      <div></div>
    </div>
  )
}

export default SinglePostpage