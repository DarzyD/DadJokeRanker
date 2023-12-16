<script>
    export let data;
    import { onMount } from 'svelte';
    import {fetchedComments, fetchedJoke} from './store.js';
    import CommentCreate from './CommentCreate.svelte';
    import CommentList from './CommentList.svelte';
  
    let jokeCommentsData;
    let jokeToDisplay;
    onMount(async() =>{
      const comments = await fetch(`http://localhost:4002/joke/${data.id}/comments`);
      const commentsJSON = await comments.json();
      const jokeData = await fetch(`http://localhost:4000/joke/${data.id}`);
      const jokeJSON = await jokeData.json();
      fetchedJoke.set(jokeJSON["joke"]);
      fetchedComments.set(commentsJSON["comments"] || []);
    });
    fetchedJoke.subscribe((joke) => {
      jokeToDisplay = joke;
    });
    fetchedComments.subscribe((comments) => {
      jokeCommentsData = comments;
    });
  </script>
  <style>
    @import './Comments.css';
  </style>

  <div class="container">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse">
          <nav-item> <a class="navbar-brand" href="/"> ⬅️ Go Back</a>   </nav-item>
          <nav-item></nav-item>
      </div>
    </nav>
    <div class="container" style="margin-top:5%;">
        <div class="card">
            <center>
              <h1>Comments for:</h1>
              <h2>{jokeToDisplay}</h2>
            </center>
            <div class = "container">
              <CommentList comments={jokeCommentsData} />
              <CommentCreate jokeId={data.id} />
            </div>
        </div>
    </div>
  </div>