<template>
  <div>

    <div class="art">
      <div class="row">
        <div class="col-sm-6">
          <video-embed class="video-embed" v-if="trailer" :src= "trailer"></video-embed>
          <img v-else src="https://pngimage.net/wp-content/uploads/2018/06/fleche-youtube-png-3.png" />
        </div>
        <div class="col-sm-6">
          <ul>
            <li>Duration: {{ movie.duration }}</li>
            <li>Year: {{ movie.year }}</li>
            <li>Language: {{ movie.language }}</li>
        <!-- <li v-for="index in 10" :key="index">
          {{ index }}
        </li> -->
        </ul>
      </div>  
    </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SingleMovie',

    props: {
      movie: Object,
      trailer: String
    }
  }

</script>

<style scoped>

.video-embed {
    max-width: 600px;
    max-height: 600px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

</style>