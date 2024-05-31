import React, { useState, useEffect } from "react";
import axios from "axios";
import "../estilos/DetalleProducto.css";

const DetalleProducto = ({ productoId, onAgregarAlCarrito }) => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productoId}`)
      .then((response) => setProducto(response.data));
  }, [productoId]);

  if (!producto) return <p>Loading...</p>;

  return (
    <article className="detalle-producto">
      <img
        src={producto.image}
        alt={producto.title}
        className="detalle-producto__imagen"
      />
      <h2 className="detalle-producto__titulo">{producto.title}</h2>
      <p className="detalle-producto__descripcion">{producto.description}</p>
      <p className="detalle-producto__precio">${producto.price}</p>
      <button
        onClick={() => onAgregarAlCarrito(producto)}
        className="detalle-producto__boton"
      >
        Agregar al Carrito
      </button>
    </article>
  );
};

export default DetalleProducto;
