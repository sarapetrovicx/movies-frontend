<template>
  <div id="app">
    <Header subtitle="Home"/>
    <img
    src = "https://img.freepik.com/premium-vector/cinema-movie-time-banner-with-flat-icons-film-reel-popcorn-soda-3d-glasses-clapperboard-tickets-isolated-vector-illustration-transparent-background_108855-3304.jpg?w=2000"
      width="400"
      alt="Logo"
    />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',
    
    components: {
      Header
    }
  }
</script>
