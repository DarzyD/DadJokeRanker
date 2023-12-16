<script>
    export let comments = [];
  </script>
  
  <ul>
    {#each comments as comment (comment.id)}
    <div class="card">
      <div class="card-body">
        {comment.content}
      </div>
    </div>
    {/each}
  </ul>