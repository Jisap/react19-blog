import { Link } from 'react-router-dom'
import Image from '../components/Image'

const SinglePostpage = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* detail */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam modi eum aut.
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Writen by</span>
            <Link className='text-blue-800'>Jhon Doe</Link>
            <span>on</span>
            <Link className='text-blue-800'>Web Design</Link>
            <span>2 days ago</span>
          </div>
          <p className='text-gray-500 font-medium'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit aptent auctor, quis nibh interdum. Dui in ornare conubia curabitur imperdiet odio suscipit aenean, risus himenaeos facilisis vestibulum taciti nibh dapibus. Non aptent luctus class tincidunt dignissim fringilla velit, netus condimentum orci ridiculus tristique dui porta bibendum, sem platea neque cursus faucibus suscipit.
          </p>
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