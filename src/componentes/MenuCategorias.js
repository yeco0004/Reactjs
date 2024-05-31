import React, { useState, useEffect } from "react";
import axios from "axios";
import "../estilos/MenuCategorias.css";

const MenuCategorias = ({ onSelectCategory, onGoToHome }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategorias(["Articulos", ...response.data]));
  }, []);

  return (
    <section className="menu-categorias">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          onClick={() => {
            if (categoria === "Articulos") {
              onGoToHome();
            } else {
              onSelectCategory(categoria);
            }
          }}
          className="menu-categorias__boton"
        >
          {categoria}
        </button>
      ))}
    </section>
  );
};

export default MenuCategorias;
