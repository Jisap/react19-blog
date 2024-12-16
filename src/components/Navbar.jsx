import React, { useState } from 'react'

const Navbar = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between relative z-30'>
      {/* Logo */}
      <div className='flex items-center gap-4 text-2xl font-bold z-10'>
        <img 
          src="/logo.png" 
          alt="Logo"
          className='w-8 h-8'
        />
        <span>React Blog</span>
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden'>
        <div 
          className='cursor-pointer text-2xl absolute top-4 right-4 z-40'
          onClick={() => setOpen((prev) => !prev)}  
        >
          {open ? "X" : "☰"}
        </div>
        {/* <div className={`
          w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 bg-[#e6e6ff] transition-all ease-in-out
          ${open ? "-right-0" : "-right-[100%]"}
        `}> */}
        <div
          className={`
          w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center gap-8 font-medium text-lg bg-[#e6e6ff] transition-transform ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}>
          <a href="/">Home</a>
          <a href="/">Trending</a>
          <a href="/">Most Popular</a>
          <a href="/">About</a>
          <a href="">
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
              Login 🖐
            </button>
          </a>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="">
          <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
            Login 🖐
          </button>
        </a>
      </div>
    </div>
  )
}

export default Navbar