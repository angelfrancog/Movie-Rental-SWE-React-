import React, { useState } from 'react';
import './CRUDPeliculas.css';

const CRUDPeliculas = ({ peliculas, onPeliculasChange }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleInputChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const agregarPelicula = () => {
    onPeliculasChange('agregar', { title: movieTitle, id: Date.now() });
    setMovieTitle('');
  };

  const editarPelicula = () => {
    if (selectedMovieId) {
      onPeliculasChange('editar', { id: selectedMovieId, title: movieTitle });
      setMovieTitle('');
      setSelectedMovieId(null);
    }
  };

  const borrarPelicula = (id, title) => {
    onPeliculasChange('borrar', { id, title });
  };

  const handleEditClick = (id, title) => {
    setMovieTitle(title);
    setSelectedMovieId(id);
  };

  return (
    <div>
      <h2>Películas</h2>
      <label>
        Título de la Película:
        <input type="text" value={movieTitle} onChange={handleInputChange} />
      </label>
      <button onClick={selectedMovieId ? editarPelicula : agregarPelicula}>
        {selectedMovieId ? 'Editar Película' : 'Agregar Película'}
      </button>
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            {pelicula.title}{' '}
            <button onClick={() => handleEditClick(pelicula.id, pelicula.title)}>
              Editar
            </button>
            <button onClick={() => borrarPelicula(pelicula.id, pelicula.title)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDPeliculas;
