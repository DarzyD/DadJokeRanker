<script>
  
    // The post ID associated with the comment
    export let jokeId;
    import {fetchedComments} from './store.js';
    // The comment content
    let content = '';
  
    const postComment = async (event) => {
      event.preventDefault();
      if(content === ''){
        alert("Please enter a comment");
      }
      const res = await fetch(`http://localhost:4002/joke/${jokeId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": jokeId, content }),
      });
  
      const data = await res.json();
      fetchedComments.update((comments) => {
        comments = data["comments"];
        return comments;
      });
      content = '';
    };
  </script>
  
  <div>
    <form on:submit={postComment}>
      <div class="form-group">
        <input bind:value={content} class="form-control" placeholder="Comment" />
      </div>
      <button class="btn btn-primary">Add Comment</button>
    </form>
  </div>