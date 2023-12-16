<script>
  import { fade } from 'svelte/transition'
  import {onMount} from 'svelte';
  import {fetchedJokes} from './store.js';
  let showLeaderboard = true;
  let jokesArray;
  async function refreshLeaderBoard(){
    showLeaderboard = false;
    const jokesData = await fetch('http://localhost:4001/leaderboard/downvotes');
    const sortedJokes = await jokesData.json(); 
    fetchedJokes.set(sortedJokes["jokes"]);
    setTimeout(() => {
      showLeaderboard = true;
    }, 10); 
  }
  onMount(async() => {
    const jokesData = await fetch('http://localhost:4001/leaderboard/downvotes');
    const sortedJokes = await jokesData.json(); 
    fetchedJokes.set(sortedJokes["jokes"]);
    showLeaderboard = true;
  });
  fetchedJokes.subscribe((jokes) => {
    jokesArray = jokes;
  });
</script>
    <div class="container">
        <center><h1>Most Downvoted Dad Jokes</h1></center>
        {#if showLeaderboard}
        <div class="card" in:fade>
          <center><button class="btn btn-primary" style="max-width:30%;" on:click={() => refreshLeaderBoard()}> Refresh Leaderboard ⟳ </button> </center>
            <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Joke</th>
                    <th scope="col">Downvotes</th>
                    <th scope="col">Comment</th>
                  </tr>
                </thead>
                <tbody>
                {#if jokesArray.length == 0}
                  <tr>
                    <h1>No jokes voted yet!</h1>
                  </tr>
                {:else}                  
                  {#each jokesArray as joke, index (joke.id)}
                    <tr>
                      <th scope="row" class="text-nowrap">
                        {#if index > 0 && joke.downvotes === jokesArray[index - 1].downvotes}
                          {jokesArray[index - 1].rank} (tie)
                        {:else}
                          {index + 1}
                        {/if}
                      </th>
                      <td class="fs-4 justify-content-md-center">{joke.joke}</td>
                      <td>{joke.downvotes}</td>
                      <td> <a href = {`/comments/${joke.id}`}>Comments</a></td>
                    </tr>
                  {/each}
                {/if}
                </tbody>
              </table>
        </div>
        {/if}
    </div>