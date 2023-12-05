<script>
    import {voteJokeId, voteJokeTrackPastIDs} from './store.js'
    import { onMount } from 'svelte';
    let jokeId;
    let curJoke;
    let jokeText;
    let pastIDs;
    let noMoreJokesFlag = false;
    const jokes = {
        "jokes": [
            {
            "id": "NucUfVvXLBd",
            "joke": "What did the hat say to the scarf?\r\nYou can hang around. I'll just go on ahead.\r\n",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "i39hqWnGljb",
            "joke": "When Dad drops a pea off of his plate \u2018oh dear I\u2019ve pee\u2019d on the table!",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "lqWgFlyPusc",
            "joke": "What do you call an Argentinian with a rubber toe? Roberto",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "fNeVDI6USnb",
            "joke": "I made a playlist for hiking. It has music from Peanuts, The Cranberries, and Eminem. I call it my Trail Mix.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "DIeaUDlbUDd",
            "joke": "\u201cMy Dog has no nose.\u201d \u201cHow does he smell?\u201d \u201cAwful\u201d",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "PC5TCQuXnrc",
            "joke": "Where do you learn to make banana splits? At sundae school.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "DAskq4oWSvc",
            "joke": "I was just looking at my ceiling. Not sure if it\u2019s the best ceiling in the world, but it\u2019s definitely up there.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "GYDY8xXLmyd",
            "joke": "Why did the girl smear peanut butter on the road? To go with the traffic jam.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "LBAQ79MJmb",
            "joke": "What\u2019s the difference between an African elephant and an Indian elephant? About 5000 miles.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "1T0gqOZT0g",
            "joke": "I thought my wife was joking when she said she'd leave me if I didn't stop signing \"I'm A Believer\"... Then I saw her face.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "2gFIBX82Etc",
            "joke": "Do I enjoy making courthouse puns? Guilty",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "1Dt4M7Ufaxc",
            "joke": "Slept like a log last night \u2026 woke up in the fireplace.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "lyPZgVn3Le",
            "joke": "What did the ocean say to the shore? Nothing, it just waved.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "eNJm3Tfaxc",
            "joke": "People are shocked to discover I have a police record but I love their greatest hits!",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "Im31ozkVnjb",
            "joke": "A boy dug three holes in the yard. When his mother saw, she exclaimed: \"well, well, well\"",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "ZgahF6MZDd",
            "joke": "Where does astronauts hangout after work? At the spacebar.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "V0wkbprcprc",
            "joke": "If you want a job in the moisturizer industry, the best advice I can give is to apply daily.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "Me2wAAl31wc",
            "joke": "Velcro\u2026 What a rip-off.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "HBszX8MJ6h",
            "joke": "I was so proud when I finished the puzzle in six months, when on the side it said three to four years.",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "HYoGYTvX0g",
            "joke": "What is the tallest building in the world? The library \u2013 it\u2019s got the most stories!",
            "upvotes": 0,
            "downvotes": 0
            },
            {
            "id": "LRnGeVfiNe",
            "joke": "Today a man knocked on my door and asked for a small donation towards the local swimming pool. I gave him a glass of water.",
            "upvotes": 0,
            "downvotes": 0
            }
        ]
    }
    voteJokeId.subscribe((id) => {
        jokeId = id;
    });
    voteJokeTrackPastIDs.subscribe((ids) => {
        pastIDs = ids;
    });
    const handleVote = (vote) => {
        if(vote === 1){
            console.log("upvote");
        }else if(vote === -1){
            console.log("downvote");
        }else{
            console.log("skip");
        }

        if(Object.keys(pastIDs).length === jokes["jokes"].length){
            noMoreJokesFlag = true;
        }else{
            let flag = true;
            while(flag){
                const randomIndex = Math.floor(Math.random() * jokes["jokes"].length);
                const tempJokeID = jokes["jokes"][randomIndex]["id"];
                if(tempJokeID !== jokeId && (pastIDs[tempJokeID] === undefined)){
                    voteJokeId.update((id) => {
                        jokeId = jokes["jokes"][randomIndex]["id"];
                        return jokes["jokes"][randomIndex]["id"];
                    });
                    voteJokeTrackPastIDs.update((ids) => {
                        return {...ids, [jokes["jokes"][randomIndex]["id"]]: 1};
                    });
                    flag = false;
                }
            }
            curJoke = jokes["jokes"].find((joke) => joke["id"] === jokeId)
            jokeText = sanitizeJokeText(curJoke["joke"]);
        }

    }
    const sanitizeJokeText = (joke) => {
        return joke.replace(/\\u[\dA-Fa-f]{4}/g, match => {
                return String.fromCharCode(parseInt(match.substring(2), 16));
               });
    }
    onMount(async () => {
        const randomIndex = Math.floor(Math.random() * jokes["jokes"].length);
        voteJokeId.update((id) => {
            jokeId = jokes["jokes"][randomIndex]["id"];
            return jokes["jokes"][randomIndex]["id"];
        });
        voteJokeTrackPastIDs.update((ids) => {
            return {...ids, [jokes["jokes"][randomIndex]["id"]]: 1};
        });
        curJoke = jokes["jokes"].find((joke) => joke["id"] === jokeId)
        jokeText = sanitizeJokeText(curJoke["joke"]);
    });
</script>
<style>
    @import './styles/VoteJokePage.css';
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
                    <button class="btn upvoteBtn" on:click={() => (handleVote(1))}>Upvote 👍</button>
                    <button class="btn downvoteBtn" on:click={() => (handleVote(-1))}>Downvote 👎</button>
                    <button class="btn skipBtn" on:click={() => (handleVote(0))}>Skip ¯\_(ツ)_/¯</button>
                </div>
            {/if}
        </div>
    </div>
</center>
