<template>
  <div>
    <h4>User Comments</h4>

    <div v-if="token" >
      <b-form-input
        v-model="comm"
        placeholder="Say something..."
        @keydown.enter="onSubmit"
      ></b-form-input>

      <b-card v-for="comment in movie.comments" :title="comment.User.name" :key="comment.id">
        <b-card-text>
          {{ comment.content }}
        </b-card-text>
      </b-card>
  </div>
  <p v-else>You must be signed in to leave a comment</p>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Comments',

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
        'postComment'
      ]),

      
      onSubmit() {
        this.$socket.emit('comment', { content: this.comm, movieId: this.movie.id, userId: 2, token: this.token });
        // this.postComment({content: this.comm, movieId: this.movie.id, userId:1, token: this.token})
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