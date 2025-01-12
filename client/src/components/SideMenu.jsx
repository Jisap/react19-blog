import React from 'react'
import Search from './Search'
import { Link, useSearchParams } from 'react-router-dom'

const SideMenu = () => {

  // Cuando los parámetros de búsqueda en la URL cambian, React Router detecta este cambio 
  // y re-renderiza los componentes que dependen de estos parámetros -> refetch de la query en <PostList/> con los nuevos params 

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {                      // Cuando cambia el valor del radio button de filtro
    if (searchParams.get("sort") !== e.target.value) {     // comprueba si el valor actual del radio button es distinto al valor del radio button que se ha cambiado
      setSearchParams({                                    // si es distinto, actualiza los parámetros de búsqueda con el nuevo valor del radio button
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {              // Cuando se pulsa en un link de categoría
    if (searchParams.get("cat") !== category) {             // comprueba si el valor de la categoría actual es distinto al valor de la categoría que se ha pulsado
      setSearchParams({                                     // si es distinto, actualiza los parámetros de búsqueda con el nuevo valor de la categoría
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };


  return (
    <div className='px-4 h-max sticky top-8'>
      <h1 className='mb-4 text-sm font-medium'>
        Search
      </h1>
      <Search />

      <h1 className='mt-8 mb-4 text-sm font-medium'>
        Filters
      </h1>
      <div className='flex flex-col gap-2 text-sm'>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
          />
          <span>Newest</span>
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
          />
          <span>Most Popular</span>
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
          />
          <span>Trending</span>
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800'
          />
          <span>Oldest</span>
        </label>
      </div>


      <h1 className='mt-8 mb-4 text-sm font-medium'>
        Categories
      </h1>
      <div className='flex flex-col gap-2 text-sm'>
        {/* <Link className='underline' to="/posts" onClick={() => handleCategoryChange("general")}>All</Link>
        <Link className='underline' to="/posts?cat=web-design" onClick={() => handleCategoryChange("web-design")}>Web Design</Link>
        <Link className='underline' to="/posts?cat=development" onClick={() => handleCategoryChange("development")}>Development</Link>
        <Link className='underline' to="/posts?cat=databases" onClick={() => handleCategoryChange("databases")}>Databases</Link>
        <Link className='underline' to="/posts?cat=seo" onClick={() => handleCategoryChange("seo")}>Search Engines</Link>
        <Link className='underline' to="/posts?cat=marketing" onClick={() => handleCategoryChange("marketing")}>Marketing</Link> */}
        <span className='underline cursor-pointer' onClick={() => handleCategoryChange("general")}>All</span>
        <span className='underline cursor-pointer' onClick={() => handleCategoryChange("web-design")}>Web Design</span>
        <span className='underline cursor-pointer' onClick={() => handleCategoryChange("development")}>Development</span>
        <span className='underline cursor-pointer' onClick={() => handleCategoryChange("databases")}>Databases</span>
        <span className='underline cursor-pointer' onClick={() => handleCategoryChange("seo")}>Search Engines</span>
        <span className='underline cursor-pointer' onClick={() => handleCategoryChange("marketing")}>Marketing</span>
      </div>
    </div>
  )
}

export default SideMenu