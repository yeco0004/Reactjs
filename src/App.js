import React, { useState, useEffect } from "react";
import MenuCategorias from "./componentes/MenuCategorias";
import ListaProductos from "./componentes/ListaProductos";
import DetalleProducto from "./componentes/DetalleProducto";
import CarritoCompras from "./componentes/CarritoCompras";
import Footer from "./componentes/Footer";
import "./App.css";
import axios from "axios";

const App = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(
    JSON.parse(sessionStorage.getItem("carrito")) || []
  );
  const [productosAleatorios, setProductosAleatorios] = useState([]);

  useEffect(() => {
    if (categoriaSeleccionada === null) {
      obtenerProductosAleatorios();
    }
  }, [categoriaSeleccionada]);

  const obtenerProductosAleatorios = async () => {
    try {
      const categoriasResponse = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      const categorias = categoriasResponse.data;

      const productosPromises = categorias.map((categoria) =>
        axios.get(`https://fakestoreapi.com/products/category/${categoria}`)
      );

      const productosResponses = await Promise.all(productosPromises);
      const productos = productosResponses.flatMap((response) => response.data);

      const productosAleatorios = productos
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      setProductosAleatorios(productosAleatorios);
    } catch (error) {
      console.error("Error al obtener productos aleatorios", error);
    }
  };

  const handleSelectCategory = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setProductoSeleccionado(null);
  };

  const handleSelectProduct = (productoId) => {
    setProductoSeleccionado(productoId);
  };

  const handleAgregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleEliminarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleGoToHome = () => {
    setCategoriaSeleccionada(null);
    setProductoSeleccionado(null);
  };

  return (
    <section className="app">
      <MenuCategorias
        onSelectCategory={handleSelectCategory}
        onGoToHome={handleGoToHome}
      />
      {productoSeleccionado ? (
        <DetalleProducto
          productoId={productoSeleccionado}
          onAgregarAlCarrito={handleAgregarAlCarrito}
        />
      ) : categoriaSeleccionada ? (
        <article className="seccion-productos">
          <h2 className="seccion-productos__titulo">{categoriaSeleccionada}</h2>
          <ListaProductos
            categoriaSeleccionada={categoriaSeleccionada}
            onSelectProduct={handleSelectProduct}
          />
        </article>
      ) : (
        <article className="seccion-productos">
          <h2 className="seccion-productos__titulo">Articulos</h2>
          <ListaProductos
            productos={productosAleatorios}
            onSelectProduct={handleSelectProduct}
          />
        </article>
      )}
      <CarritoCompras
        carrito={carrito}
        onEliminarDelCarrito={handleEliminarDelCarrito}
      />
      <Footer />
    </section>
  );
};

export default App;
