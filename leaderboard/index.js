import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
const getJokes = async () => {
    const jokes = await fetch('http://joke:4000/jokes');
    const jokesJSON = await jokes.json();
    return jokesJSON;
}
//returns the leaderboard sorted by upvotes
app.get('/leaderboard/upvotes', async (req, res) => {
    const jokes = await getJokes();
    const onlyJokesWithUpvotes = jokes.filter(joke => joke.upvotes > 0);   
    if(onlyJokesWithUpvotes.length === 0){
        res.json({ jokes: [] });
    }else{
        const sortedJokes = onlyJokesWithUpvotes.sort((a, b) => b.upvotes - a.upvotes); 
        let currentRank = 1;
        let prevUpvotes = sortedJokes[0].upvotes;
        sortedJokes.forEach((joke,index) => {
            if(joke.upvotes !== prevUpvotes){
                currentRank = index + 1;
                prevUpvotes = joke.upvotes;
            }
            joke.rank = currentRank;
        });
        res.json({ jokes: sortedJokes });
    }
});

//returns the leaderboard sorted by downvotes
app.get('/leaderboard/downvotes', async (req, res) => {
    const jokes = await getJokes();
    const onlyJokesWithDownvotes = jokes.filter(joke => joke.downvotes < 0);
    if(onlyJokesWithDownvotes.length === 0){
        res.json({ jokes: [] });
    }else{
        const sortedJokes = onlyJokesWithDownvotes.sort((a, b) => a.downvotes - b.downvotes);
        let currentRank = 1;
        let prevDownvotes = sortedJokes[0].downvotes;
        sortedJokes.forEach((joke,index) => {
            if(joke.downvotes !== prevDownvotes){
                currentRank = index + 1;
                prevDownvotes = joke.downvotes;
            }
            joke.rank = currentRank;
        });
        res.json({ jokes: sortedJokes });
    }
});

app.post('/events', async(req, res) => {
    const event = req.body;
    console.log(`(${process.pid}) Leaderboard service (Received Event) ${event.type}`);
    res.send({ status: 'OK' });}
);

app.listen(4001, () => {
    console.log(`(${process.pid}) Leaderboard service listening on 4001`);
});