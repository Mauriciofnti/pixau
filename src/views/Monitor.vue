<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

import { products } from '@/stores/produtos'
const monitores = products.filter(p => p.category === 'Monitores')

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>

<template>
  <h1>MONITORES</h1>
  <section>
    <div class="item" v-for="product in monitores" :key="product.id">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.image" :alt="product.name" class="imagem" />
        <p>{{ product.name }}</p>
        <h2 class="price">R${{ product.price.toFixed(2) }}</h2>
      </RouterLink>
      <button class="add-to-cart" @click="addToCart(product)">Adicionar ao Carrinho</button>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 24px;
  background-color: brown;
  text-align: center;
  padding: 10px;
}

h2 {
  background-color: aquamarine;
  text-align: center;
  font-size: 26px;
}

section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  gap: 20px;
  padding: 20px;
}

.item {
  max-width: 300px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

img {
  max-width: 100%;
  height: auto;
}

.add-to-cart {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
}

.add-to-cart:hover {
  background: #0056b3;
}
</style>