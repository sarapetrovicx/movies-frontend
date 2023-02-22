<template>
    <div>
      <Header :subtitle="subtitle"/>
      <img v-if="this.image" :src="this.image" />
      <img v-else src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" />
    </div>
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'Director',
  
      components: {
        Header,

      },
  
      data() {
        return {
          director: null,
          subtitle: '',
          image: ''
        }
      },
      
      methods: {
        ...mapActions([
          'getDirector'
        ])
      },
  
      mounted() {
        this.getDirector(this.$route.params.id).then( res => {
          this.director = res;
          this.first_name = res.first_name;
          this.subtitle = this.director.first_name + " " + this.director.last_name ;
          this.image = res.image;
        });
      }
    }
  
  </script>

<style scoped>

img {
  max-width: 600px;
  max-height: 600px;
}


</style>