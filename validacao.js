const { validationResult } = require("express-validator");

const validarRequisicao = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { 
                errors: errors.array().map(
                    obj => ({
                        campo: obj.path, 
                        mensagem: obj.msg, 
                    })
                )
            }
        );
    }
    next();
}

module.exports = validarRequisicao