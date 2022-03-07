import keys from './key.js';

import pg from 'pg';
import { createClient } from 'redis';

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//pg setup

const pgClient = new pg.Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: parseInt(keys.pgPort)
});

pgClient.on('connect', (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.log(err));
})

//redis setup
const redisClient = createClient({
    socket: {
        host: keys.redisHost,
        port: keys.redisPort,
        reconnectStrategy: () => 1000
    },
});
await redisClient.connect();

const pub = redisClient.duplicate();
await pub.connect();
// express route handler

app.get('/', (req, res) => {
    res.send('hi');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values");

    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    try {
        const values = await redisClient.hGetAll('values');
        res.send(values);
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/values', async (req, res) => {    
    const index = req.body.index;
    console.log("index is " + index);

    if (parseInt(index) > 40) {
        return res.status(422).send('Index is too high!');
    }

    await redisClient.hSet('values', index, 'Nothing Yet!');
    await pub.publish('insert', index);
    await pgClient.query('INSERT INTO values (number) VALUES ($1)', [index]);

    res.send({ working: true });
})

app.listen(5000, err => {
    console.log('Listening Port : 5000');
});