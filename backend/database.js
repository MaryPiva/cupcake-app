const sqlite3 = require('sqlite3').verbose();

// Conexão com o banco de dados
const db = new sqlite3.Database('./cupcakes.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação de tabelas e inserção de cupcakes de exemplo
db.serialize(() => {
    // Criar a tabela de cupcakes
    db.run(`
        CREATE TABLE IF NOT EXISTS Cupcakes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL
        )
    `);

    // Inserir cupcakes de exemplo
    const stmt = db.prepare("INSERT INTO Cupcakes (nome, preco) VALUES (?, ?)");
    stmt.run("Cupcake de Chocolate", 10.00);
    stmt.run("Cupcake de Morango", 12.00);
    stmt.run("Cupcake de Baunilha", 8.00);
    stmt.run("Cupcake de Limão", 9.50);
    stmt.finalize();
});

module.exports = db;
