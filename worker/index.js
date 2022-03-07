
import { createClient } from 'redis';
import keys from './key.js';

const redisClient = createClient({
    socket: {
        host: keys.redisHost,
        port: keys.redisPort,
        reconnectStrategy: () => 1000
    }
});

await redisClient.connect();

await redisClient.set('value',3);

const sub = redisClient.duplicate();
await sub.connect();

const fib = (index) => {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

await sub.subscribe('insert', async (message, chan) => {
    console.log('message', message);
    console.log('chan', chan);
    if(message != null)
    {
        await redisClient.hSet('values', message, fib(parseInt(message)));
    }
});


// sub.on('message', async (channel, message) => {
//     console.log("message: ", message);
//     console.log("channel", channel);
//     // await redisClient.hSet('values', message, fib(parseInt(message)));
// });
// await sub.subscribe('insert');
