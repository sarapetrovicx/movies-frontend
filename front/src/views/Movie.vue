<template>
  <div>
    <Header :subtitle="subtitle"/>
    <SingleMovie v-if="movie" :movie="movie" :trailer="trailer"/>
    <div class="row">
      <div class="col-sm-6">
        <Comments v-if="movie" :movie="movie" />
      </div>
      <div class="col-sm-6">
        <Ratings v-if="movie" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import SingleMovie from '@/components/SingleMovie.vue';
  import Comments from '@/components/Comments.vue';
  import Ratings from '@/components/Ratings.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Movie',

    components: {
      Header,
      SingleMovie,
      Comments,
      Ratings
    },

    data() {
      return {
        movie: null,
        subtitle: '',
        trailer: ''
      }
    },
    
    methods: {
      ...mapActions([
        'getMovie'
      ])
    },

    mounted() {
      this.getMovie(this.$route.params.id).then( res => {
        this.movie = res;
        this.trailer = res.trailer;
        this.subtitle = this.movie.title;
      });
    }
  }

</script>