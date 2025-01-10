import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


import React from 'react'

const Search = () => {

  const location = useLocation();                                                // Obtiene información sobre la ubicación actual del usuario (path y parámetros de búsqueda).
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();                     // Obtiene los parámetros de búsqueda del usuario.

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;                                              // Obtiene el texto ingresado en el campo.
      if (location.pathname === "/posts") {                                      // Si ya estamos en "/posts",
        setSearchParams({ ...Object.fromEntries(searchParams), search: query }); // solo actualizamos los parámetros de búsqueda.
      } else {
        navigate(`/posts?search=${query}`);                                      // Si estamos en otra ruta, redirigimos a "/posts" con el nuevo parámetro de búsqueda. 
      }
    }
  };


  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="search a post..."
        className="bg-transparent focus:outline-none focus:ring-0"
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default Search