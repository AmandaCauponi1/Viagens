const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')


const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const door = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// middleware para usar arquivos estáticos
app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.render('home')
})

app.post('/viagens/insertviagem', (req, res) => {
    const {destino, data_ida, data_volta, impressoes} = req.body

    const sql = `INSERT INTO tb_viagens (??, ??, ??, ??) VALUES (?, ?, ?, ?)`

    const data = ['destino', 'data_ida', 'data_volta', 'impressoes',  destino, data_ida, data_volta, impressoes]

    pool.query(sql, data, (err) => {
        if(err){
            console.log(err)
            
            return
        }
        return res.redirect('/')
    })
    
})

app.get('/viagens', (req, res) => {

    const sql = `SELECT * FROM tb_viagens`


    pool.query(sql, (err, data) => {
        if(err){
            console.log(err)
            return
        }
        const viagens = data
        res.render('viagens', {viagens})
    })
   
})

app.get('/viagens/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const sql = `SELECT * FROM tb_viagens WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const viagem = data[0]
        //console.log(viagem)
        return res.render('viagem', {viagem})
    })
})


app.get('/viagens/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM tb_viagens WHERE id = ${id}`

    pool.query(sql, (err, data) => {
        if(err){
            console.log(err)
            return
        }
        const viagem = data[0]
        res.render('editviagem', {viagem})
    })
})

app.post('/viagens/updateviagem', (req, res) => {
    const {id, destino, data_ida, data_volta, impressoes} = req.body
    const sql = `UPDATE tb_viagens SET ?? = ?, ?? = ?, ??= ?, ?? = ? WHERE ?? = ?`

    const data = ['destino', destino, 'data_ida', data_ida, 'data_volta', data_volta, 'impressoes', impressoes, 'id', id]
    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
            return
        }
        return res.redirect('/viagens')
    })

    
})

app.post('/viagens/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM tb_viagens WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, (err) => {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/viagens')
    })
})


app.listen(door, () => {
    console.log(`Rodando na porta ${door}`)
})