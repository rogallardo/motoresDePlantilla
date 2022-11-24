import express from 'express'
import {Contenedor} from '../contenedor/contenedorFs.js'
// ROUTER

const rutaProducto = express.Router();

const productos = new Contenedor ('src/db/productos.txt')
//
const privilegio = (peticion, respuesta, next) => {
    const administrador = peticion.headers.administrador;
    if (administrador === 'true') {
      next();
    } else {
      respuesta.status(401).send({ error : -1, descripcion: `ruta ${peticion.url} no autorizada` });
    }
  };
//ENDPOINTS
//


rutaProducto.get('/', async (peticion, respuesta) => {
    const arrayProductos = await productos.getAll();
    !arrayProductos && respuesta.status(404).json(notFound);
    respuesta.status(200).json(arrayProductos);
    const id = parseInt(peticion.params.id);
})
rutaProducto.get('/:id', async (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    const producto = await productos.getById(id);
    !producto && respuesta.status(404).json(notFound);
    respuesta.status(200).json(producto);
})


rutaProducto.post('/', async (peticion, respuesta) => {
  const data = peticion.body;
    const nuevoProducto = await productos.save(data);
    !data && respuesta.status(204).json(notFound);
    respuesta.status(201).json(data);
    
})

rutaProducto.put('/:id', privilegio, async (peticion, respuesta) => {
  const idProducto = parseInt(peticion.params.id);
  const producto = peticion.params.id;
  await productos.update(idProducto, producto);
  respuesta.json(producto);
});

rutaProducto.delete('/:id', async (peticion, respuesta) => {
    const idProducto = parseInt(peticion.params.id);
    await productos.deleteById(idProducto) 
    respuesta.status(200).json(idProducto);
    
})

export { rutaProducto }