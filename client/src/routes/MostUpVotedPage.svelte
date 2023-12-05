<script>
  import { fade } from 'svelte/transition'
  import {onMount} from 'svelte';
  let showLeaderboard = true;
  function handleClick() {
      console.log("clicked")
  }
  function refreshLeaderBoard(){
    showLeaderboard = false;

    setTimeout(() => {
      showLeaderboard = true;
    }, 10); 
  }
  onMount(async() => {
    showLeaderboard = true;
  });
</script>


    <div class="container">
          <center><h1>Most Upvoted Dad Jokes</h1></center>
          {#if showLeaderboard}
          <div class="card" in:fade>
            <center><button class="btn btn-primary" style="max-width:30%;" on:click={() => refreshLeaderBoard()}> Refresh Leaderboard ⟳ </button> </center>
              <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Rank #</th>
                      <th scope="col">Joke</th>
                      <th scope="col">Vote Count</th>
                      <th scope="col">Comment Count</th>
                    </tr>
                  </thead>
                  <tbody>
  
                  </tbody>
                </table>
          </div>
          {/if}
    </div>


