import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const rootPath = 'http://localhost:4000';
const authPath = 'http://localhost:2000';

export default new Vuex.Store({
  state: {
    movies: [],
    genres: [],
    token: '',
    directors: []
  },

  mutations: {

    addGenres(state, gen) {
      state.genres = gen;
    },

    addDirectors(state, dir) {
      state.directors = dir;
    },
    addMovies(state, movie){
      state.movies = movie;
    },

    addMovie(state, movie){
      state.movies.push(movie);
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    addComment(state, obj) {
      const movie = state.movies.filter( mv => mv.id == obj.movieId )[0];
      if(!movie.comments)
        movie.comments = [];
      movie.comments.push(obj.comment);
    },

    addRating(state, obj) {
      const movie = state.movies.filter( mv => mv.id == obj.movieId )[0];
      if (!movie.ratings) 
        movie.ratings = [];
      movie.ratings.push(obj.comment);
    }
  },

  actions: {

    fetchGenres({ commit }){
      fetch(`${rootPath}/api/genres`, { 
        method: 'GET',
        // headers: { 'Authorization': `Bearer ${state.token}` }
    })
        .then( obj => obj.json() )
        .then( res => commit('addGenres', res) );
    },

    fetchDirectors({ commit }){
      fetch(`${rootPath}/api/directors`, { 
        method: 'GET',
        // headers: { 'Authorization': `Bearer ${state.token}` }
    })
        .then( obj => obj.json() )
        .then( res => commit('addDirectors', res) );
    },

    getDirector({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        const director = state.directors.filter( dir => dir.id == id )[0];
        // console.log("movie");
        if (director) {
          resolve(director);
        } else {
          fetch(`${rootPath}/api/directors/${id}`,{
            // headers: { 'Authorization': `Bearer ${state.token}` }
          })
            .then( obj => obj.json())
            .then( res => {
              commit('addDirectors', res);
              resolve(res);
              console.log(res);}
            )
          }
        })
      },

    fetchMovies({ commit }){
      fetch(`${rootPath}/api/movies`, { 
        method: 'GET',
        // headers: { 'Authorization': `Bearer ${state.token}` }
      })
        .then( obj => obj.json() )
        .then( res => commit('addMovies', res) );
    },


    getMovie({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        const movie = state.movies.filter( movie => movie.id == id )[0];
        if (movie) {
          console.log("mov")
          resolve(movie);
        } else {
          fetch(`${rootPath}/api/movies/${id}`,{
            // headers: { 'Authorization': `Bearer ${state.token}` }
          })
            .then( obj => obj.json())
            .then( res => {
              fetch(`${rootPath}/api/comments/movie/${id}`, {
                headers: { 'Authorization': `Bearer ${state.token}` }
              }).then( resp => resp.json() )
                .then( comments => {
                  res['comments'] = comments;
                  console.log(res);
                  // commit('addMovie', res);
                  // resolve(res);
                });
              fetch(`${rootPath}/api/ratings/movie/${id}`, {
                headers: { 'Authorization': `Bearer ${state.token}` }
              }).then( resp => resp.json() )
                .then( ratings => {
                  res['ratings'] = ratings;
                  console.log(res);
                  commit('addMovie', res);
                  resolve(res);
                });
            });
        }
      });
    },
   

    search({ commit }, q) {
      return new Promise( (resolve, reject) => {
        fetch(`${rootPath}/api/movies/find/${q}`,{
          headers: { 'Authorization': `Bearer ${state.token}` }
        })
          .then( obj => obj.json() )
          .then( res => {
            console.log(res);
            commit('addMovies', res);
            resolve(res);
          });
      });
    },

    postComment({ commit, state }, obj) {
      let noviKomentar = {
        userId: obj.userId,
        content: obj.content,
        movieId: obj.movieId,
     };
     console.log(JSON.stringify(noviKomentar))
      fetch(`${rootPath}/api/comments`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}`        
        },
        body: JSON.stringify(noviKomentar)
      })
      .then( obj => obj.json() )
      .then( res => {
        console.log(res);
        commit('addComment', ({comment: res, movieId: obj.movieId}));
        resolve(res);
      });
    },

    postRating({ commit, state }, obj) {
      let noviKomentar = {
        userId: obj.userId,
        rate: obj.rate,
        movieId: obj.movieId,
     };
     console.log(JSON.stringify(noviKomentar))
      fetch(`${rootPath}/api/ratings`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}`        
        },
        body: JSON.stringify(noviKomentar)
      })
      .then( obj => obj.json() )
      .then( res => {
        console.log(res);
        commit('addRating', ({comment: res, movieId: obj.movieId}));
        resolve(res);
      });
    },



    register({ commit }, obj) {
      fetch(`${authPath}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch(`${authPath}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

    //kad god veb soket primi comment izvrsi se ova fja (umesto postComment())
    //msg je sve sto smo emitovali na bekendu
    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      console.log(comment.movieId + 'pls');
      commit('addComment', { movieId: comment.movieId, comment: comment });
    }
  }
})
