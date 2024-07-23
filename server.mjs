import express from "express"
import mysql from "mysql2"
import axios from "axios"
import path from "path"

import http from "http"
import https from "https"
import fs from "fs"

import { fileURLToPath } from 'url'
import { dirname } from 'path'

// SSL

const privateKey  = fs.readFileSync('ssl/key.pem')
const certificate = fs.readFileSync('ssl/cert.pem')
const credentials = {key: privateKey, cert: certificate}

// DB
const DB_HOST = "migae5o25m2psr4q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
const DB_USER = "kybptzzi90ijr22f"
const DB_PWD = "aj9nn1qhnk1v45o3"
const DB_NAME = "wltbv9r1f6t0b5v5"

const pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME
})

// Misc
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function getUrlFor (dataSet) { return 'https://data.cityofnewyork.us/resource/' + dataSet + '.json' }

async function getViolations(bin) { return axios.get(getUrlFor('3h2n-5cm9'), { params: { bin: bin } }) }
async function getEcbViolations(bin) { return axios.get(getUrlFor('6bgk-3dad'), { params: { bin: bin } }) }
async function getPermits(bin) { return axios.get(getUrlFor('ipu4-2q9a'), { params: { bin__: bin } }) }

const app = express()

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, './dist/stone-corellc-2')))

app.get('/', function (_req, res) {
        res.sendFile(path.join(__dirname + '/dist/stone-corellc-2/index.html'))
})

app.get('/favs/:email', async (req, res) => {
        const { email } = req.params
        const favs = await pool.promise().query('SELECT BIN FROM FAV_BUILDINGS WHERE EMAIL = ?', [email])
        res.json(favs[0])
}) 

app.get('/users/:email', async (req, res) => {
        const { email } = req.params
        const users = await pool.promise().query('SELECT * FROM USERS WHERE EMAIL = ?', [email])
        res.json(users[0])
})

//---------------------------------------------------------------------//
app.get('/violations/', async (req, res) => {

        await getViolations(req.query.bin).then(
                response => {
                        res.json(response.data)
                        return res
                })

})

app.get('/ecbViolations', async (req, res) => {

        await getEcbViolations(req.query.bin).then(
                response => {
                        res.json(response.data)
                        return res
                })

})

app.get('/permits', async (req, res) => {

        await getPermits(req.query.bin).then(
                response => {
                        res.json(response.data)
                        return res
                })

})


// USE https locally to get google login AND http on heroku deploy

// const httpPort   = process.env.PORT || 8080
// const httpServer = http.createServer(app)
// httpServer.listen(httpPort)
// console.log('http  on ' + httpPort)


const httpsPort  = process.env.PORT || 8443
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(httpsPort)
console.log('https on ' + httpsPort)
