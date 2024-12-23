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
            w="600"
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* content */}
      <div className='flex flex-col md:flex-row gap-8'>
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
        </div>
        {/* menu */}
        <div className='px-4 h-max sticky top-8'>
          <h1>Author</h1>
          <div>
            <Image 
              src="userImg.jpeg"
              className="w-12 h-12 rounded-full object-cover"
              w="48"
              h="48"
            />
            <Link>
              John Doe
            </Link>
            <p>
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
        </div>
      </div>
    </div>
  )
}

export default SinglePostpage