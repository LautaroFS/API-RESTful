const express = require('express')
const app = express()
const router = require('./router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080

app.use('/api/productos', router)


app.listen(PORT, () => {
    console.log(`Servidor levantado en ${PORT}`);
})