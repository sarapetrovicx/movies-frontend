<template>
  <div id="app">
    
    <div>
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand to="/">MovieList</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>

            <b-nav-item to="/list">List</b-nav-item>

            <!-- <b-nav-item-dropdown text="Genres">
               <b-dropdown-item 
                v-for="genre in genres"
                :key="genre.id"
                :to="`/list`" > 
                {{ genre.genre_name }}
              </b-dropdown-item>
            </b-nav-item-dropdown> -->

            <b-nav-item-dropdown text="Directors">
               <b-dropdown-item 
                v-for="director in directors"
                :key="director.id"
                :to="`/director/${director.id}`" > 
                {{ director.first_name }} {{ director.last_name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
            <b-nav-item v-else @click="logout()">Log Out</b-nav-item>

            <b-nav-form>
              <b-form-input v-model="searchQuery" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button @click="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    
    <router-view class="stranica" />
  </div>
</template>

<script>

  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: 'App',

    data() {
      return {
        searchQuery: ''
      }
    },

    computed: {
      ...mapState([
        'token',
        'genres',
        'directors'
      ])
    },

    mounted() {
      this.fetchGenres();
      // this.fetchMovies(); 
      this.fetchDirectors();

      if (localStorage.token) {
        this.setToken(localStorage.token);
      }
    },

    methods: {
      ...mapActions([
        'fetchGenres',
        'fetchMovies',
        'fetchDirectors'
      ]),

      ...mapMutations([
        'removeToken',
        'setToken'
      ]),

      search(e) {
        e.preventDefault();

        const sq = this.searchQuery;
        this.searchQuery = '';
        
        this.$router.push({ name: 'Search', query: { q: sq } });
      },

      logout() {
        this.removeToken();
      }
    },

    sockets: {
      error(err) {
        alert(err);
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 10px;
  }

  .stranica {
    width: 80%;
    margin-left: 10%;
  }
</style>
