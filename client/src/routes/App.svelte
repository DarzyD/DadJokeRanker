<script>
	import AboutPage from "./AboutPage.svelte";
    import VoteJokePage from "./VoteJokePage.svelte";
    import MostUpVotedPage from "./MostUpVotedPage.svelte";
    import MostDownVotedPage from "./MostDownVotedPage.svelte";
    
	export let menu = 0;
</script>

<style>
    ul li {
        margin: 1%; /* Add margin to all sides of each list item */
    }
    .nav-item:hover {
        background-color: #4c4f53; /* Change to the background color you prefer */
        transition: box-shadow 1s;
        color: #fff; /* Change to the text color you prefer */
        border-radius: 20px;
    }
</style>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <div class="collapse navbar-collapse justify-content-md-center mx-auto">
        <a class="navbar-brand" href="/" on:click|preventDefault={() => (menu = 0)}>DadJokeRankings</a>
        <ul class="navbar-nav d-flex align-items-center">
            <li class="nav-item active text-nowrap">
                <a class="nav-link text-white" href="/" on:click|preventDefault={() => (menu = 0)}>About</a>
            </li>
            <li class="nav-item active text-nowrap">
                <a class="nav-link text-white" href="/" on:click|preventDefault={() => (menu = 1)}>Vote Joke</a>
            </li>
            <li class="nav-item active text-nowrap">
                <a class="nav-link text-white" href="/" on:click|preventDefault={() => (menu = 2)}>Most Upvoted Leaderboard</a>
            </li>
            <li class="nav-item active text-nowrap">
                <a class="nav-link text-white" href="/" on:click|preventDefault={() => (menu = 3)}>Most Downvoted Leaderboard</a>
            </li>
        </ul>
    </div>
</nav>
<div style="margin-top: 5%;">
    {#if menu === 0}
    <AboutPage />
    {:else if menu === 1}
        <VoteJokePage />
    {:else if menu === 2}
        <MostUpVotedPage />
    {:else if menu === 3}
        <MostDownVotedPage />
    {:else}
        <h1>
            Page Not Found
        </h1>
    {/if}
</div>
