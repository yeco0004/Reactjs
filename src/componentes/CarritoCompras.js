import React, { useState } from "react";
import "../estilos/CarritoCompras.css";

const CarritoCompras = ({ carrito, onEliminarDelCarrito }) => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const toggleMostrarCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const calcularTotal = () => {
    return carrito
      .reduce((total, producto) => total + parseFloat(producto.price), 0)
      .toFixed(2);
  };

  return (
    <section className="carrito-compras" onClick={toggleMostrarCarrito}>
      <h2 className="carrito-compras__titulo">Carrito de compras({carrito.length})</h2>
      {mostrarCarrito && (
        <section className="carrito-compras__contenido">
          <ul className="carrito-compras__lista">
            {carrito.map((producto, index) => (
              <li key={index} className="carrito-compras__item">
                <img
                  src={producto.image}
                  alt={producto.title}
                  className="carrito-compras__imagen"
                />
                <article className="carrito-compras__detalles">
                  <h3 className="carrito-compras__titulo">{producto.title}</h3>
                  <p className="carrito-compras__precio">${producto.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEliminarDelCarrito(index);
                    }}
                    className="carrito-compras__eliminar"
                  >
                    Limpiar carrito de compras
                  </button>
                </article>
              </li>
            ))}
          </ul>
          <p className="carrito-compras__total">TOTAL: ${calcularTotal()}</p>
        </section>
      )}
    </section>
  );
};

export default CarritoCompras;
