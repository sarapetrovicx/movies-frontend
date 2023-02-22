<template>
    <div>
      <h4>User Ratings</h4>
  
      <div v-if="token" >
        <b-form-input
        type="number" min="1" max="10"
          v-model="comm"
          placeholder="Rate from 1 to 10..."
          @keydown.enter="onSubmit"
        ></b-form-input>
  
        <b-card v-for="comment in movie.ratings" :title="comment.User.name" :key="comment.id">
          <b-card-text>
            {{ comment.rate }}
          </b-card-text>
        </b-card>
    </div>
    <p v-else>You must be signed in to leave a rating</p>
  
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Ratings',
  
      props: {
        movie: Object
      },
  
      data() {
        return {
          comm: '',
        }
      },
  
      computed: {
        ...mapState([
          'token'
        ])
      },
  
      methods: {
        ...mapActions([
          'postRating'
        ]),
  
        onSubmit() {
          this.postRating({rate: parseInt(this.comm), movieId: this.movie.id, userId:2, token: this.token})
          this.comm = '';
        },
      }
    }
  
  </script>
  
  <style scoped>
    .card {
      margin-top: 10px;
      text-align: left;
    }
  
    .card-title {
      margin-bottom: 0px;
    }
  
    .card-body {
      padding-bottom: 5px;
    }
  </style>