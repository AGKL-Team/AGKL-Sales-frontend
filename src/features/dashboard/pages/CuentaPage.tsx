import React, { useState } from 'react';

// ASUMO que el Header está en una carpeta compartida.
// ¡Ajustá esta ruta si es necesario!
import Header from "../../../features/dashboard/components/Header"

// Importa las imágenes desde la carpeta de assets
import userAvatar from '../../../assets/user.png';

const CuentaPage: React.FC = () => {
  // Estado para manejar los datos del formulario
  const [userData, setUserData] = useState({
    nombre: 'Usuario de Ejemplo',
    correo: 'usuario@ejemplo.com',
    direccion: 'Av. Siempre Viva 742',
    telefono: '353-1234567',
  });

  // Maneja los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí conectarías con el backend para guardar los datos
    console.log('Datos a enviar:', userData);
    alert('Datos modificados (revisa la consola)');
  };

  return (
    <div className="theme-responsive" style={{ minHeight: '100vh' }}>
      <Header />

      <section style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: '24px', color: 'var(--theme-text)' }}>
          Mi Cuenta
        </h2>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
          
          {/* Columna Izquierda: Avatar */}
          <div style={{ flex: '0 0 200px', textAlign: 'center', position: 'relative' }}>
            <img 
              src={userAvatar} 
              alt="Avatar de usuario" 
              style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #e0e0e0' }} 
            />
          </div>

          {/* Columna Derecha: Formulario */}
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyles}>Nombre</label>
              <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} style={inputStyles} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyles}>Correo Electrónico</label>
              <input type="email" name="correo" value={userData.correo} onChange={handleChange} style={inputStyles} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyles}>Dirección de envío</label>
              <input type="text" name="direccion" value={userData.direccion} onChange={handleChange} style={inputStyles} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyles}>Número telefónico</label>
              <input type="tel" name="telefono" value={userData.telefono} onChange={handleChange} style={inputStyles} />
            </div>

            <button type="submit" style={buttonStyles}>Modificar</button>
          </form>
        </div>
      </section>
    </div>
  );
};

// --- Estilos para mantener el código más limpio ---

const labelStyles: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 500,
  color: 'var(--theme-text)',
};

const inputStyles: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '16px',
  boxSizing: 'border-box',
};

const buttonStyles: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#5a67d8',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const editButtonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#007bff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
};

export default CuentaPage;