<template>
  <HeaderComponent />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <FooterComponent />
</template>

<style scoped>
/* Transição fade */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0; 
}

</style>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>