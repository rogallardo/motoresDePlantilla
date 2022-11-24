export class Contenedor {
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
