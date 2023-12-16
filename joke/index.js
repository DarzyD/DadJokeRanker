import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import db from './db.js';
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

//returns a random joke
app.get('/joke', async (req, res) => {
    console.log(`(${process.pid}) Joke Service: GET /joke`);
    const randomJoke = await db.getRandomJoke();
    res.send(randomJoke);
});

//returns a specific joke
app.get('/joke/:id', async (req, res) => {
    console.log(`(${process.pid}) Joke Service: GET /joke/:id`);
    const id = req.params.id;
    const joke = await db.getJoke(id);
    res.send(joke);
});

//returns all the jokes
app.get('/jokes', async (req, res) => {
    console.log(`(${process.pid}) Joke Service: GET /jokes`);
    const jokes = await db.getJokes();
    res.send(jokes);
});

//changes the vote count for a joke and then sends back a random joke
app.post('/joke/vote', async (req, res) => {
    console.log(`(${process.pid}) Joke Service: POST /joke/vote`);
    const { id, type } = req.body;
    if(type === 'upvote'){
        await db.upvoteJoke(id);
    }else if(type === 'downvote'){
        await db.downvoteJoke(id);
    }
    const randomJoke = await db.getRandomJoke();   
    res.send(randomJoke);
});

//
app.post('/events', (req, res) => {
    const event = req.body;
    console.log(`(${process.pid}) Joke (Received Event) ${event.type}`);
    res.send({ status: 'OK' });
});

app.listen(4000, () => {
    console.log(`(${process.pid}) Joke service listening on 4000`);
  });