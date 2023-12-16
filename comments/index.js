import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import db from './db.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

//gets the comments of a specific joke
app.get('/joke/:id/comments', async (req, res) => {
  console.log(`(${process.pid}) Comments Service: GET /posts/:id/comments`);
  const id = req.params.id;
  const commentsByPostId = await db.getCommentsById(id);
  res.send(commentsByPostId);
});
//creates a comment for a specific joke
//NOTE THIS ID IS FOR THE JOKE NOT THE COMMENT BEING ADDED
app.post('/joke/:id/comments', async (req, res) => {
  console.log(`(${process.pid}) Comments Service: POST /posts/:id/comments`);
  const { id, content } = req.body;
  const newComments = await db.addComment(id, content);
  try {
    await fetch('http://event-bus:4003/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'CommentCreated',
        data: {
          content,
          jokeID: id,
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Comments Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send(newComments);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;

  console.log(`(${process.pid}) Comments Service Received Event: ${type}`);

  res.send({});
});


app.listen(4002, () => {
  console.log(`(${process.pid}) Comments Service: Listening on 4002`);
});