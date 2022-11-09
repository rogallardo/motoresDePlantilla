class Contenedor {
    constructor(productos) {
        this.productos = productos
    }

    save(producto) {
       let id = 1
        this.productos.map((x)=>{
            if(x.id >= id){
                id = x.id + 1
            }
        } )
        producto.id = id
        this.productos.push(producto)
        return id
    }
    update(id, producto) {
        
        const apendID = {
            ...producto,
            id: id
        }
        this.productos.push(apendID)
        return id
    }
    getById(id) {
        // recibe Id y devuelve el objeto con ese id
        const idEncontrado = this.productos.find(producto => producto.id === id)
        return idEncontrado
    }
    getAll() {
        return this.productos
    }
    deleteById(productoID) {
        const prodIdBorrado = this.productos.filter(producto => producto.id !== productoID)
        this.productos = prodIdBorrado
    }
}

const productos = new Contenedor ([])

//prueba
// ROUTER
const express = require('express')
const {
    Router
} = express;

const aplicacion = express();

//definir rutas
//const rutaProductos = Router()


//Rutas
const puerto = 8080
//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({
    extended: true
}))
aplicacion.set('views', __dirname +'/views')
aplicacion.set('view engine', 'pug')

//ingresamos rutas a la aplicacion

//aplicacion.use('/productos', rutaProductos)

//**HACEMOS LA CARPETA PUBLIC VISIBLE */
aplicacion.use('/static', express.static(__dirname + '/public'))

//ENDPOINTS

///////////////////////////
aplicacion.get('/productos', (peticion, respuesta) => {
    
    const productosShow = productos.getAll()
    respuesta.render('lista',{
        productos: productosShow
    })
    
})
/////////////////////////////////
aplicacion.get('/', (peticion, respuesta) => {
    respuesta.render('formulario',{}) 
})
//////////////////////////
aplicacion.post('/productos', (peticion, respuesta) => {   
    const productoIngresado = peticion.body;
    productos.save(productoIngresado)
    const productosShow = productos.getAll()
    respuesta.render('formulario',{
        productos: productosShow
    })
})



const servidor = aplicacion.listen(puerto, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error', error => console.log(`Error: ${error}`))