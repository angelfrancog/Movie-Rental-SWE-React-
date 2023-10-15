import React, { useState } from 'react';
import './CRURentas.css';

const CRURentas = ({ clientes, peliculas, rentas, onRentasChange }) => {
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedRentaIndex, setSelectedRentaIndex] = useState(null);

  const handleClientChange = (e) => {
    setSelectedClientId(e.target.value);
  };

  const handleMovieChange = (e) => {
    setSelectedMovieId(e.target.value);
  };

  const handleRentCreate = () => {
    if (selectedClientId && selectedMovieId) {
      const newRent = {
        clientId: selectedClientId,
        movieId: selectedMovieId,
        rentDate: new Date().toISOString(),
      };
  
      if (editMode) {
        onRentasChange('editar', selectedRentaIndex, newRent);
        setEditMode(false);
      } else {
        onRentasChange('agregar', null, newRent);
      }
  
      setSelectedClientId(null);
      setSelectedMovieId(null);
      setSelectedRentaIndex(null);
    }
  };
  

  const handleEditClick = (index) => {
    const rentaToEdit = rentas[index];
    setSelectedClientId(rentaToEdit.clientId);
    setSelectedMovieId(rentaToEdit.movieId);
    setEditMode(true);
    setSelectedRentaIndex(index);
  };

  return (
    <div>
      <h2>Rentas</h2>
      <label>
        Cliente:
        <select value={selectedClientId} onChange={handleClientChange}>
          <option value="">Seleccionar Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </label>

      <label>
        Película:
        <select value={selectedMovieId} onChange={handleMovieChange}>
          <option value="">Seleccionar Película</option>
          {peliculas.map((pelicula) => (
            <option key={pelicula.id} value={pelicula.id}>
              {pelicula.title}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleRentCreate}>{editMode ? 'Editar Renta' : 'Crear Renta'}</button>


      <h3>Lista de Rentas</h3>
      <ul>
        {rentas.map((renta, index) => (
          <li key={index}>
            ID del Cliente: <strong>{renta.clientId}</strong>, ID de la Película: <strong>{renta.movieId}</strong>, Fecha y hora de Creación: <strong>{renta.rentDate}</strong>
            <button onClick={() => handleEditClick(index)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRURentas;
