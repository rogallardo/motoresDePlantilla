import express from 'express';
import { rutaProducto } from './routes/productos.js';
import { rutaCarrito } from './routes/carrito.js';

const aplicacion = express();

const port = process.env.PORT || 8080
//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({
    extended: true
}))

//implementar rutas
aplicacion.use('/api/producto', rutaProducto)
aplicacion.use('/api/carrito', rutaCarrito)

//////////////////////////
 ///SERVIDOR////

const servidor = aplicacion.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error', error => console.log(`Error: ${error}`))