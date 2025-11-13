const express = require('express');
const router = express.Router();
const mysql = require('../myql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
//const multer = require('multer');
//const upload = multer({ dest: '/uploads/' });

//Cadastrar Usuario
router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        conn.query('SELECT * FROM usuarios WHERE email = ?',
            [req.body.email, req.body.controle], (error, results) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (results.length > 0) {
                    res.status(409).send({ mensagem: 'Usuário já cadastrado' });
                } else {
                    bcrypt.hash(req.body.senha, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({ error: err })
                        }
                        conn.query(
                            `INSERT INTO usuarios (email, senha, controle) VALUES (?, ?, ?)`,
                            [req.body.email, hash, req.body.controle],
                            (error, results) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) }

                                return res.status(201).send({
                                    mensagem: 'Usuário criado com sucesso',
                                    usuarioCriado: {
                                        email: req.body.email
                                    }
                                });
                            });
                    });
                }

            });

    });
});


router.post('/login', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) { return res.status(401).send({ mensagem: 'Falha na autenticação' }) }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' });
                }
                if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: '12h'
                        }
                    );

                    return res.status(200).send(
                        {
                            mensagem: 'Autenticado com sucesso.',
                            controle: results[0].controle,
                            token: token,
                        });
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' });
            })
        })
    })
})


router.get("/listar", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM usuarios;", (error, resultado, field) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

module.exports = router;