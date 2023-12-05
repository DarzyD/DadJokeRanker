<script>
  export let data;
</script>
<style>
    a{
        padding: 1%;
        margin:1%;
    }
     a:hover {
        background-color: #4c4f53; 
        transition: box-shadow 1s;
        color: #fff; 
    }
</style>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div class="collapse navbar-collapse">
      <nav-item> <a class="navbar-brand" href="/"> ⬅️ Go Back</a>   </nav-item>
  </div>
</nav>
<center>
    <div class="container">
        <h1>Comment Section for {data.id}</h1>
        <div class="card">
            <h2>Joke</h2>
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
    </div>
</center>