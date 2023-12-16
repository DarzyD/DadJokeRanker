import {MongoClient} from 'mongodb';
import { randomBytes } from 'crypto';

const url = 'mongodb://admin:admin@mongodb:27017';
const client = new MongoClient(url);
const dbName = 'dadJokeDB';
let comments;
const getCommentsCollection = async () => {
    if(!comments){
        await client.connect();
        const db = client.db(dbName);
        comments = db.collection('comments');
    }
    return comments;
}
const getCommentsById = async (id) => {
    try{
        const commentsCollection = await getCommentsCollection();
        const docs = await commentsCollection.find({id}).toArray();
        return docs[0] || [];
    }catch(err){
        console.log(err);
    }
}
const addComment = async (id, content) => {
    try{
        const commentsCollection = await getCommentsCollection();
        const docs = await commentsCollection.find({id}).toArray();
        const commentsForId = docs[0];
        const comment = {
            id: randomBytes(4).toString('hex'),
            content
        }
        if(!commentsForId){
            const newCommentSection = {id, comments: [comment]};
            await commentsCollection.insertOne(newCommentSection);
            return newCommentSection; 
        }else{
            commentsForId.comments.push(comment);
            await commentsCollection.updateOne(
                { id },
                { $set: { comments: commentsForId.comments } }
            );
            return commentsForId;
        }
    }catch(err){
        console.log(err);
    }
}

export default {
    getCommentsById,
    addComment
};