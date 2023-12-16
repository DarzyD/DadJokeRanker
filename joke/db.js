import {MongoClient} from 'mongodb';

const url = 'mongodb://admin:admin@mongodb:27017';
const client = new MongoClient(url);
const dbName = 'dadJokeDB';
let jokes;
const getJokesCollection = async () => {
    if(!jokes){
        await client.connect();
        const db = client.db(dbName);
        jokes = db.collection('joke');
    }
    return jokes;
}
const getJokes = async () => {
    try{
        const jokesCollection = await getJokesCollection();
        const jokes = await jokesCollection.find({}).toArray();
        return jokes;
    }catch(err){
        console.log(err);
    }
}
const getJoke = async (id) => {
    try{
        const jokesCollection = await getJokesCollection();
        const docs = await jokesCollection.find({id}).toArray();
        return docs[0] || {};
    }catch(err){
        console.log(err);
    }
}

const getRandomJoke = async () => {
    try{
        const jokesCollection = await getJokesCollection();
        const jokes = await jokesCollection.find({}).toArray();
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return randomJoke;
    }catch(err){
        console.log(err);
    }
}
const upvoteJoke = async (id) => {
    try{
        const jokesCollection = await getJokesCollection();
        const docs = await jokesCollection.find({id}).toArray();
        const joke = docs[0];
        if(!joke){
            return {};
        }else{
            joke.upvotes++;
            await jokesCollection.updateOne({id}, {$set: joke});
            return joke;
        }
    }catch(err){
        console.log(err);
    }
}

const downvoteJoke = async (id) => {
    try{
        const jokesCollection = await getJokesCollection();
        const docs = await jokesCollection.find({id}).toArray();
        const joke = docs[0];
        if(!joke){
            return {};
        }else{
            joke.downvotes--;
            await jokesCollection.updateOne({id}, {$set: joke});
            return joke;
        }
    }catch(err){
        console.log(err);
    }
}

export default {
    getJokes,
    getJoke,
    getRandomJoke,
    upvoteJoke,
    downvoteJoke
};