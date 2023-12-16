<script>
    import {voteJokeId, voteJokeTrackPastIDs} from './store.js'
    import { onMount } from 'svelte';
    let jokeId;
    let curJoke;
    let jokeText;
    let pastIDs;
    let noMoreJokesFlag = false;
    const MAXJOKES = 171; //number of jokes in the database
    voteJokeId.subscribe((id) => {
        jokeId = id;
    });
    voteJokeTrackPastIDs.subscribe((ids) => {
        pastIDs = ids;
    });
    const updateID = (newJokeID) => {
        voteJokeId.update((id) => {
                jokeId = newJokeID;
                return newJokeID;
            });
        voteJokeTrackPastIDs.update((ids) => {
            return {...ids, newJokeID: 1};
        });        
    }
    const handleVote = async (vote) => {
        let type;
        if(vote === 1){
            type = "upvote";
        }else if(vote === -1){
            type = "downvote";
        }else{
            type = "skip";
        }
        const newJokeData = await fetch(`http://localhost:4000/joke/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": jokeId, type}),
        });
        const newJokeJSON = await newJokeData.json();
        const newJokeID = newJokeJSON["id"];
        if(newJokeID !== jokeId && (pastIDs[newJokeID] === undefined)){
            updateID(newJokeID);
            curJoke = newJokeJSON;
        }else{
            let flag = true;
            while(flag){
                const jokeData = await fetch('http://localhost:4000/joke');
                const jokeJSON = await jokeData.json();
                const tempJokeID = jokeJSON["id"];
                if(tempJokeID !== jokeId && (pastIDs[tempJokeID] === undefined)){
                    updateID(tempJokeID);
                    curJoke = jokeJSON;
                    flag = false;
                }
            }
        }
        jokeText = sanitizeJokeText(curJoke["joke"]);
        if(pastIDs.length === MAXJOKES){
            noMoreJokesFlag = true;
        }
    }
    const sanitizeJokeText = (joke) => {
        return joke.replace(/\\u[\dA-Fa-f]{4}/g, match => {
                return String.fromCharCode(parseInt(match.substring(2), 16));
               });
    }
    onMount(async () => {
        const jokeData = await fetch('http://localhost:4000/joke');
        const jokeJSON = await jokeData.json();
        voteJokeId.update((id) => {
            jokeId = jokeJSON["id"];
            return jokeJSON["id"];
        });
        voteJokeTrackPastIDs.update((ids) => {
            let newId = jokeJSON["id"]
            return {...ids, newId: 1};
        });
        curJoke = jokeJSON;
        jokeText = sanitizeJokeText(curJoke["joke"]);
    });
</script>
<style>
    .card{
        background: #fff;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    }
</style>
<center>
    <div class="container">
        <h1>Random Joke</h1>
        <div class="card">
            {#if noMoreJokesFlag}
                <h2>No more jokes to vote on! Please wait for an update!</h2>
            {:else}
                <h2>{jokeText}</h2>
                <div>
                    <button class="btn btn-success" on:click={() => (handleVote(1))}>Upvote 👍</button>
                    <button class="btn btn-danger" on:click={() => (handleVote(-1))}>Downvote 👎</button>
                    <button class="btn btn-secondary" on:click={() => (handleVote(0))}>Skip ¯\_(ツ)_/¯</button>
                </div>
            {/if}
        </div>
    </div>
</center>
