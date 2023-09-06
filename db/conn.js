const mysql = require('mysql2')



const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: '3306',
    user: 'aluno_medio',
    password: '@lunoSenai23.',
    database: 'viagens'
})

module.exports = pool