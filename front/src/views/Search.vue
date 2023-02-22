<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <MovieList />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import MovieList from '@/components/MovieList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Search',
    
    components: {
      Header,
      MovieList
    },

    data() {
      return {
        subtitle: 'Search results: ',
      }
    },

    mounted() {
      this.search(this.$route.query.q).then( res => {
        this.subtitle += res.lenght;
      });
    },

    methods: {
      ...mapActions([
        'search'
      ])
    }
  }
</script>

<style scoped>

</style>
