// Recibe la cantidad de items totales, cuántos se muestran por página y la función para cambiar de página.

import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calcular el número total de páginas
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Si solo hay una página, no mostramos el paginador
  if (pageNumbers.length <= 1) return null;

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        {/* Botón Anterior */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            className="page-link"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {/* Números de página */}
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}

        {/* Botón Siguiente */}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            className="page-link"
            disabled={currentPage === pageNumbers.length}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;