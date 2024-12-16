import React, { useState } from 'react'

const Navbar = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      {/* Logo */}
      <div className='flex items-center gap-4 text-2xl font-bold'>
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
          className='cursor-pointer text-4xl'
          onClick={() => setOpen((prev) => !prev)}  
        >
          {open ? "X" : "☰"}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex'>
        D
      </div>
    </div>
  )
}

export default Navbar