const path = require("path");
const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize, Comment, User } = require('./models');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, 'static')));

const studentRoutes = require("./routes/user.js");
app.use("/api/users", studentRoutes);

const movieRoutes = require("./routes/movie.js");
app.use("/api/movies", movieRoutes);

const directorRoutes = require("./routes/director.js");
app.use("/api/directors", directorRoutes);

const genreRoutes = require("./routes/genre.js");
app.use("/api/genres", genreRoutes);

const watchlist = require("./routes/watchlist.js");
app.use("/api/watchlists", watchlist);

const moviedir = require("./routes/moviedirection.js");
app.use("/api/moviedirections", moviedir);

const moviegenre = require("./routes/moviegenre.js");
app.use("/api/moviegenres", moviegenre);

const moviewatchlist = require("./routes/moviewatchlist.js");
app.use("/api/moviewatchlists", moviewatchlist);

const rating = require("./routes/rating.js");
app.use("/api/ratings", rating);

const comment = require("./routes/comment.js");
app.use("/api/comments", comment);


function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);
 
    socket.on('comment', msg => {
        const data = {
            content : msg.content,
            userId : msg.userId,
            movieId : msg.movieId,
        }
        console.log(data);
        
        Comment.create(data)
            .then( rows => {
                Comment.findOne({ where: { id: rows.id }})
                    .then( msg => io.emit('comment', JSON.stringify(msg)) ) 
            }).catch( err => socket.emit('error', err.message) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

server.listen({ port: 4000 }, async () => {
    await sequelize.authenticate();
    console.log("Started server on localhost:8000");
});