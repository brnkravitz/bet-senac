const express = require('express')
const { validationResult } = require('express-validator')

const recursoClientes = require('./recursos/clientes')
const recursoApostas = require('./recursos/apostas')

const app = express()
const port = 3000

app.use(express.json())

app.use('/clientes', recursoClientes)
app.use('/apostas', recursoApostas)

// Custom global error handler for validation errors
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

app.listen(port, () => {
    console.log(
        `Example app listening on port ${port}`
    )
})