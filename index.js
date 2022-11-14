const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080

const productos = [
    {
        "nombre": "Coca-Cola 500ml",
        "id": 1,
        "precio": 150
    },
    {
        "nombre": "Coca-Cola 1,5lts",
        "id": 2,
        "precio": 300
    },
    {
        "nombre": "Coca-Cola 3lts",
        "id": 3,
        "precio": 500
    },
    {
        "nombre": "Fanta 500ml",
        "id": 4,
        "precio": 100
    }
]

/* TRAER TODOS LOS PRODUCTOS */
app.get("/api/productos", (req, res) => {
    res.send({ productos })
})

/* TRAER UN SOLO PRODUCTO CON SU ID */
app.get("/api/productos/:id", (req, res) => {
    const { id } = req.params
    res.send({ productos: productos[parseInt(id) - 1] })
})

/* POST */
app.post("/api/productos", (req, res) => {
    const { producto } = req.body
    productos.push(producto)
    res.send({ mensaje: "Almacenado correctamente" })
})

/* PUT */
app.put("/api/productos/:id", (req, res) => {
    const { producto } = req.params
    const { id } = req.body

    const newId = productos[parseInt(id) - 1]
    productos[parseInt(id) - 1] = producto
})

/* DELETE */
app.delete("/api/productos/:pos", (req, res) => {
    const { pos } = req.params
    const prod = productos.slice(parseInt(pos) - 1, 1)
    res.send({ palabra: prod })
})


app.listen(PORT, () => {
    console.log(`Servidor levantado en ${PORT}`);
})