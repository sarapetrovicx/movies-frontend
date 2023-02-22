<template>
  <div id="app">
    <Header subtitle="Movies"/>
    <MovieList />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import MovieList from '@/components/MovieList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'List',
    
    components: {
      Header,
      MovieList
    },

    data() {
        return {
            subtitle: '',
            depID: null
        }
    },

    watch: {
      $route() {
        this.fetchMovies();
      }
    },

    mounted() {
        this.fetchMovies();
    },

    methods: {
      ...mapActions([
        'fetchMovies'
      ])
    }
  }
</script>

<style scoped>

</style>
