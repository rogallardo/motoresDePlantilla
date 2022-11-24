import express from 'express'
import {Contenedor} from '../contenedor/contenedorFs.js'
// ROUTER

const rutaProducto = express.Router();

const productos = new Contenedor ('src/db/productos.txt')
//ENDPOINTS

rutaProducto.get('/', async (peticion, respuesta) => {
    const listaProductos = await productos.getAll();
    respuesta.json(listaProductos)
})
rutaProducto.get('/:id', (peticion, respuesta) => {
    
})


rutaProducto.post('/', (peticion, respuesta) => {
    
})

rutaProducto.put('/:id', (peticion, respuesta) => {
    
})

rutaProducto.delete('/:id', (peticion, respuesta) => {
    
})

export { rutaProducto }