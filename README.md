# DadJokeRanker

Here is a demo of the web application:


https://github.com/DarzyD/DadJokeRanker/assets/61167958/1c57f0a0-147a-49e3-ad5d-e5702091a2ce


## Overview

Welcome to my final project for CS 426 at UMass Amherst, built using a microservice architecture. 

This web application is designed to provide users with a platform for reading and voting on random dad jokes for entertainment. Additionally, users can explore the leaderboard section to discover which jokes have garnered the most upvotes and downvotes from the community. For those who wish to share their thoughts or reactions to a particular joke, there's a comment section available as well. 

## Technical Details

### Frontend: Svelte
This was a technical requirement for the final project. Honestly though, I found it quite similar to React.js and I appreciated how much simpler Svelte is compared to React.js.

### Backend: Node.js and Express
This was also another technical requirement for the final project. This project utilized various node packages like pm2, morgan, and much more to ensure processes for each service are allocated and logged sufficiently for scalability and maintainability. Additially, the crossover of using Javascript for the frontend and backend provides minimal background knowledge required to do this project.

### Database: MongoDB
We had the choice of using SQL or MongoDB for the final project. I ultimately decided to use MongoDB for this project because of the nature of the data we are dealing with. A relational database like SQL would be too rigid for this project due to the schema constraints because we are dealing with a lot of nested data for the jokes and comments. As a result, I choose MongoDB for its flexability and how well it pairs with the data this application will be dealing with.

For this project, I decided to fetch the 171 jokes from the ihazmadjoke API found [here](https://icanhazdadjoke.com/api) and used a playground script to load them into the MongoDB DB service. At the time, I didn't want to implement a service that fetches from the API due to time constraints with the final project. This will be something I might address in the future...

## Requirements
Docker \
Docker compose

## Usage
Clone it!

```
$ git clone https://github.com/DarzyD/DadJokeRanker.git
```
Go into the project directory and run the command:
```
$ docker compose up
```

Connect to the mongoDB service on port 27017 with credentials:
```
$ username: admin
$ password: admin
```
and run the playground script in the ```db``` folder to load the jokes on the database service.

Open http://localhost:3000 and enjoy!


## Motivation
A little backstory on my webdev journey. Back in December 2022 as a Junior CS major at UMass Amherst, I was frustrated with how little I knew about webdev as all the related courses were full due to how popular they were. As a result, I took initiative and decided to learn HTML, CSS and later React.js on my own during the winter break to create a simple frontend that displayed random dad jokes found [here](https://github.com/DarzyD/randomDadJokes). Later on in my academic career, I had the opportunity to enroll in CS 326 (Web Programming) and CS 426 (Scalable Web Systems) that enlightened me with invaluable knowledge and skills. For CS 426, we were required to create a web applciation in a microservice architecture for a final project. Thus, to go full circle with my web-dev journey, I wanted to apply the knowledge and skills I learned from CS 326 and CS 426 to this web application: DadJokeRanker.

