const express = require('express');
const router = express.Router();

// Constantes para manejamento de excessões
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');

const Usuarios = require('../models/Usuario');

router.use(express.json());

// Rotas CREATE
router.post('/', async (req, res) => {
    const body = req.body;
    const usuario = {
        nome: body.nome,
        email: body.email,
        senha: body.senha
    }
    await Usuarios.create(usuario);
    res.status(200).send(usuario);
});


// Rotas READ
router.get('/read_all/', asyncHandler (async (req, res, next) => {
    try {
        const users = await Usuarios.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        next(createError(500, 'An error ocurred when trying to retrieve all data from the table "Usuarios".', error));
        return;
    }
}));

router.get('/read/by_pk/:pk', asyncHandler (async (req, res, next) => {
    const { pk } = req.params
    try {
        const user = await Usuarios.findByPk(pk);
        res.status(200).json(user);
    }
    catch (error) {
        next(createError(500, 'An error ocurred when trying to retrieve all data from the table "Usuarios".', error));
        return;
    }
}));


// Rotas UPDATE
router.put('/', async (req, res) => {
    res.status(404).send('Implementar rota UPDATE.')
});


// Rotas DELETE
router.delete('/', async (req, res) => {
    res.status(404).send('Implementar rota DELETE.')
});



router.use((error, req, res, next) => {
    // Seta o HTTP Status Code
    res.status(error.status || 500);
  
    // Envia a resposta
    res.json({
        status: error.status,
        message: error.message
    })
});

module.exports = router;