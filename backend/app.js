const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Importa a configuração do banco de dados

const app = express();
app.use(bodyParser.json());

// Endpoint para adicionar um cupcake ao banco de dados
app.post('/add-cupcake', (req, res) => {
    const { name, price, image_url } = req.body;

    db.run(`
        INSERT INTO cupcakes (name, price, image_url)
        VALUES (?, ?, ?)
    `, [name, price, image_url], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Cupcake adicionado com sucesso!', id: this.lastID });
    });
});

// Endpoint para enviar uma mensagem de contato
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    db.run(`
        INSERT INTO mensagens_contato (name, email, message)
        VALUES (?, ?, ?)
    `, [name, email, message], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    });
});

// Endpoint para ver todos os cupcakes
app.get('/cupcakes', (req, res) => {
    db.all('SELECT * FROM cupcakes', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ cupcakes: rows });
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
