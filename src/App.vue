<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent/>
    <!-- <transition name="fade" mode="out-in"> -->
      <RouterView class="RouterView"/>
    <!-- </transition> -->
  <FooterComponent/>

</template>

<style scoped>
.RouterView {
  margin-top: 3%;
}
/* Transição fade */
/* .fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0; 
}*/

</style>
