<script setup>
import { RouterLink, useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { products } from '../stores/produtos'
import { ref } from 'vue'

// Declara a prop category
defineProps(['category'])

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// Lista de categorias válidas
const validCategories = [
  'Monitores',
  'Periféricos',
  'Processadores',
  'Memorias-RAM',
  'Placas-mãe',
  'GPUs',
  'SSDs'
]

// Normaliza a categoria para corresponder ao formato em products.js
const normalizeCategory = (category) => {
  const categoryMap = {
    'monitores': 'Monitores',
    'perifericos': 'Periféricos',
    'processadores': 'Processadores',
    'memorias-ram': 'Memorias-RAM',
    'placas-mae': 'Placas-mãe',
    'placas-video': 'GPUs',
    'ssds': 'SSDs',
    'gpus': 'GPUs' // Mapeia "GPU" para "Placas de Vídeo"
  }
  const normalized = categoryMap[category.toLowerCase()] || 'Monitores'
  return normalized
}

// Inicializa a categoria normalizada
const normalizedCategory = ref(normalizeCategory(route.params.category || 'Monitores'))

// Verifica se a categoria é válida, caso contrário redireciona
if (!validCategories.includes(normalizedCategory.value)) {
  router.replace('/products/Monitores')
}

// Filtra produtos pela categoria normalizada
const filteredProducts = ref(products.filter(p => p.category === normalizedCategory.value))

// Atualiza produtos quando a rota muda
onBeforeRouteUpdate((to) => {
  const newCategory = normalizeCategory(to.params.category || 'Monitores')
  if (!validCategories.includes(newCategory)) {
    router.replace('/products/Monitores')
    return false
  }
  normalizedCategory.value = newCategory
  filteredProducts.value = products.filter(p => p.category === normalizedCategory.value)
})

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>

<template>
  <h1>{{ normalizedCategory.toUpperCase() }}</h1>
  <section>
    <div class="item" v-for="product in filteredProducts" :key="product.id">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.image[0]" :alt="product.name" class="imagem" />
        <p>{{ product.name }}</p>
        <h2 class="price">R${{ product.price.toFixed(2) }}</h2>
      </RouterLink>
      <button class="add-to-cart" @click="addToCart(product)">Adicionar ao Carrinho</button>
    </div>
    <p v-if="!filteredProducts.length">Nenhum produto encontrado para esta categoria.</p>
  </section>
</template>

<style scoped>
h1 {
  font-size: 24px;
  background-color: #461111;
  color: #fff;
  box-shadow: 1px 2px 2px 1px #dfa5a5;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}

h2 {
    background-color: #6aaf59;
    text-align: center;
    font-size: 26px;
    box-shadow: 1px 2px 2px  #461111;
}

section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    gap: 10px;
    padding: 20px;
}

.item {
    max-width: 300px;
    width: 400px;
    border:  solid #ddd;
    padding: 10px;
    background-color: #fff;
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