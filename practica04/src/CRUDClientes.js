import React, { useState } from 'react';
import './CRUDClientes.css';

const CRUDClientes = ({ clientes, onClientesChange }) => {
  const [userName, setUserName] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const agregarCliente = () => {
    onClientesChange('agregar', { nombre: userName, id: Date.now() });
    setUserName('');
  };

  const editarCliente = () => {
    if (selectedClientId) {
      onClientesChange('editar', { id: selectedClientId, nombre: userName });
      setUserName('');
      setSelectedClientId(null);
    }
  };

  const borrarCliente = (id, nombre) => {
    onClientesChange('borrar', { id, nombre });
  };

  const handleEditClick = (id, nombre) => {
    setUserName(nombre);
    setSelectedClientId(id);
  };

  return (
    <div>
      <h2>Clientes</h2>
      <label>
        Nombre del Cliente:
        <input type="text" value={userName} onChange={handleInputChange} />
      </label>
      <button onClick={selectedClientId ? editarCliente : agregarCliente}>
        {selectedClientId ? 'Editar Cliente' : 'Agregar Cliente'}
      </button>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre}{' '}
            <button onClick={() => handleEditClick(cliente.id, cliente.nombre)}>
              Editar
            </button>
            <button onClick={() => borrarCliente(cliente.id, cliente.nombre)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDClientes;
