const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados SQLite
const db = new sqlite3.Database('./loja_cupcakes.db', (err) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Cria a tabela de cupcakes
db.run(`
    CREATE TABLE IF NOT EXISTS cupcakes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar a tabela cupcakes:', err.message);
    } else {
        console.log('Tabela cupcakes criada (ou já existe).');
    }
});

// Cria a tabela de carrinho
db.run(`
    CREATE TABLE IF NOT EXISTS carrinho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total DECIMAL(10, 2) DEFAULT 0
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar a tabela carrinho:', err.message);
    } else {
        console.log('Tabela carrinho criada (ou já existe).');
    }
});

// Cria a tabela de itens do carrinho
db.run(`
    CREATE TABLE IF NOT EXISTS itens_carrinho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        carrinho_id INTEGER,
        cupcake_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY (carrinho_id) REFERENCES carrinho(id),
        FOREIGN KEY (cupcake_id) REFERENCES cupcakes(id)
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar a tabela itens_carrinho:', err.message);
    } else {
        console.log('Tabela itens_carrinho criada (ou já existe).');
    }
});

// Cria a tabela de mensagens de contato
db.run(`
    CREATE TABLE IF NOT EXISTS mensagens_contato (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar a tabela mensagens_contato:', err.message);
    } else {
        console.log('Tabela mensagens_contato criada (ou já existe).');
    }
});

// Fecha a conexão com o banco de dados
// db.close();

module.exports = db;
