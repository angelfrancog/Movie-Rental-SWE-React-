import React, { useState } from 'react';
import CRUDClientes from './CRUDClientes';
import CRUDPeliculas from './CRUDPeliculas';
import CRURentas from './CRURentas';
import './App.css';


const CLIENTES = [
  { id: 1, nombre: 'Angel' },
  { id: 2, nombre: 'Ivan' },
  { id: 3, nombre: 'Franco' },
];

const PELICULAS = [
  { id: 1, title: 'Shrek' },
  { id: 2, title: 'Shrek 2' },
  { id: 3, title: 'Shrek 3' },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('clientes');
  const [clientes, setClientes] = useState(CLIENTES);
  const [peliculas, setPeliculas] = useState(PELICULAS);
  const [rentas, setRentas] = useState([]);
  
  const onClientesChange = (accion, nuevoCliente) => {
    switch (accion) {
      case 'agregar':
        setClientes((prevClientes) => [...prevClientes, nuevoCliente]);
        break;
      case 'borrar':
        setClientes((prevClientes) =>
          prevClientes.filter((x) => x.id !== nuevoCliente.id)
        );
        break;
      case 'editar':
        setClientes((prevClientes) =>
          prevClientes.map((x) =>
            x.id === nuevoCliente.id ? { ...nuevoCliente } : x
          )
        );
        break;
      default:
    }
  };

  const onPeliculasChange = (accion, nuevaPelicula) => {
    switch (accion) {
      case 'agregar':
        setPeliculas((prevPeliculas) => [...prevPeliculas, nuevaPelicula]);
        break;
      case 'borrar':
        setPeliculas((prevPeliculas) =>
          prevPeliculas.filter((x) => x.id !== nuevaPelicula.id)
        );
        break;
      case 'editar':
        setPeliculas((prevPeliculas) =>
          prevPeliculas.map((x) =>
            x.id === nuevaPelicula.id ? { ...nuevaPelicula } : x
          )
        );
        break;
      default:
    }
  };

  const onRentasChange = (accion, index, nuevaRenta) => {
    switch (accion) {
      case 'agregar':
        setRentas((prevRentas) => [...prevRentas, nuevaRenta]);
        break;
      case 'editar':
        setRentas((prevRentas) =>
          prevRentas.map((renta, i) =>
            i === index ? { ...nuevaRenta } : renta
          )
        );
        break;
      default:
    }
  };
  
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('clientes')}>Clientes</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('peliculas')}>Peliculas</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('rentas')}>Rentas</button>
          </li>
        </ul>
      </nav>

      <div className="label-top-right">BlockFranco</div>
      <hr />

      {currentPage === 'clientes' && (
        <CRUDClientes clientes={clientes} onClientesChange={onClientesChange} />
      )}
      {currentPage === 'peliculas' && (
        <CRUDPeliculas peliculas={peliculas} onPeliculasChange={onPeliculasChange} />
      )}
      {currentPage === 'rentas' && (
        <CRURentas clientes={clientes} peliculas={peliculas} rentas={rentas} onRentasChange={onRentasChange} />
      )}
    </div>
  );
};

export default App;
