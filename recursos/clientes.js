const express = require('express')
const router = express.Router()
const Cliente = require('../modelos/cliente')
const { paginate } = require('../paginacao')
const { body } = require('express-validator')
const validarRequisicao = require('../validacao')
const validarCPF = require('../validadorCPF')

router.get('/', async (req, res) => {
    const { nome, page, pageSize } = req.query
    const clientes = await paginate(
        Cliente, 
        parseInt(page || 1), 
        parseInt(pageSize || 5),
        {
            nome: { [Op.like]: `%${nome}%`}
        }
    );
    return res.send(clientes)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const cliente = await Cliente.findByPk(id)
    if (!cliente) {
        return res.status(404).send('Cliente não encontrado!')
    }
    return res.send(cliente)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const cliente = await Cliente.findByPk(id)
    if (!cliente) {
        return res.status(404).send('Cliente não encontrado!')
    }
    cliente.destroy()
    return res.send(cliente)
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const cliente = await Cliente.findByPk(id)
    if (!cliente) {
        return res.status(404).send('Cliente não encontrado!')
    }
    const { nome, documento, dataNascimento } = req.body
    if (nome) {
        cliente.nome = nome
    }
    if (documento) {
        cliente.documento = documento
    }
    if (dataNascimento) {
        cliente.dataNascimento = dataNascimento
    }
    cliente.save();
    return res.send(cliente)
})

router.post(
    '/',
    body('nome')
       .notEmpty()
       .withMessage('Nome não pode ser vazio'),
    body('documento')
        .custom(validarCPF)
        .withMessage('CPF inválido'),
    body('dataNascimento')
        .isDate()
        .withMessage('Data inválida'),
    validarRequisicao,
    async (req, res) => {
        const { nome, documento, dataNascimento } = req.body
        const cliente = await Cliente.create({ nome, documento, dataNascimento })
        return res.send(cliente)
    }
)

module.exports = router