const ERROR = { error: "Producto no encontrado" }
const products = [
    {
        nombre: "Fanta",
        precio: 12,
        cantidad: 2,
        id: 1
    }
]

class Container {
    constructor() {
    }

    getAll(req, res) {
        try {
            res.send(products)
        } catch (error) {
            res.send('No existen productos')
        }
    }


    getById(req, res) {
        const { id } = req.params
        if (isNaN(id)) {
            res.send('El id ingresado no es valido. Pruebe ingresando un numero.')
        }
        const product = products.filter(prod => prod.id === Number(id))
        if (!product[0]) {
            res.send(ERROR)
        } else {
            res.json(product)
        }
    }

    create(req, res) {
        try {
            const { nombre, precio, cantidad } = req.body
            const prod = { nombre: nombre, precio: precio, cantidad: cantidad }
            if (products.length === 0) {
                prod.id = 0
            } else {
                const idPosterior = products[products.length - 1].id
                prod.id = idPosterior + 1
            }
            products.push(prod)
            res.json({ prod })
        } catch (error) {
            res.send('Producto no cargado')
        }
    }

    updateById(req, res) {
        try {
            const { id } = req.params
            const { nombre, precio, cantidad } = req.body
            if (isNaN(id)) {
                res.send('El id ingresado no es valido. Pruebe ingresando un numero.')
            }
            const product = products.filter(prod => prod.id === Number(id))
            if (!product[0]) {
                res.send(ERROR)
            }
            const prodUpdate = { nombre: nombre, precio: precio, cantidad: cantidad, id: (products.length + 1) }
            products.push(prodUpdate)
            res.json(prodUpdate)
        } catch {
            res.send(ERROR)
        }
    }

    deleteById(req, res) {
        const { id } = req.params
        const prodDelete = products.splice(parseInt(id) - 1, 1)
        res.json({ prodDelete })
    }
}
module.exports = Container