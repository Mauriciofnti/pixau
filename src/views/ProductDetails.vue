<template>
  <div class="product-details-container">
    <h1>{{ product ? product.name : 'Produto não encontrado' }}</h1>
    <div v-if="product" class="product-details">
      <div class="product-image">
        <div class="carousel-container">
          <div class="carousel-track" ref="track">
            <div class="carousel-item" v-for="(image, index) in productImages" :key="index">
              <img class="carousel-image" :src="image.src" :alt="image.alt" />
            </div>
          </div>
          <button class="carousel-btn prev" ref="prevBtn" @click="goToSlide(currentIndex + 1)">❮</button>
          <button class="carousel-btn next" ref="nextBtn" @click="goToSlide(currentIndex - 1)">❯</button>
          <div class="carousel-dots">
            <span
              class="dot"
              v-for="(image, index) in productImages"
              :key="index"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"
            ></span>
          </div>
        </div>
      </div>
      <div class="product-info">
        <p class="price">R${{ product.price.toFixed(2) }}</p>
        <h2>Especificações</h2>
        <p>{{ product.specifications }}</p>
        <button class="add-to-cart" @click="addToCart(product)">Adicionar ao Carrinho</button>
        <RouterLink :to="`/products/${product.category.toLowerCase().replace(' ', '-')}`" class="back-link">Voltar para {{ product.category }}</RouterLink>
      </div>
    </div>
    <div v-else>
      <p>Produto não encontrado.</p>
      <RouterLink to="/monitores">Voltar para Monitores</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { products } from '../stores/produtos.js'
import { onMounted, onUnmounted, ref, computed } from 'vue'

const route = useRoute()
const cartStore = useCartStore()
const product = products.find(p => p.id === Number(route.params.id))
const currentIndex = ref(0)
const track = ref(null)
const prevBtn = ref(null)
const nextBtn = ref(null)
const autoplay = ref(null)

const productImages = computed(() => {
  return product ? product.image.map(src => ({ src, alt: `${product.name} - Imagem ${product.image.indexOf(src) + 1}` })) : []
})

onMounted(() => {
  prevBtn.value.addEventListener('click', () => goToSlide(currentIndex.value + 1))
  nextBtn.value.addEventListener('click', () => goToSlide(currentIndex.value - 1))

  autoplay.value = setInterval(() => {
    goToSlide(currentIndex.value + 1)
  }, 5000)

  track.value.addEventListener('mouseenter', () => clearInterval(autoplay.value))
  track.value.addEventListener('mouseleave', () => {
    autoplay.value = setInterval(() => {
      goToSlide(currentIndex.value + 1)
    }, 5000)
  })
})

onUnmounted(() => {
  clearInterval(autoplay.value)
})

const updateCarousel = () => {
  if (track.value) {
    track.value.style.transform = `translateX(-${currentIndex.value * 100}%)`
  }
}

const goToSlide = (index) => {
  if (product) {
    currentIndex.value = index
    if (currentIndex.value >= product.image.length) currentIndex.value = 0
    if (currentIndex.value < 0) currentIndex.value = product.image.length - 1
    updateCarousel()
  }
}

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>
<style scoped>
h1 {
  text-align: center;
  margin: 10px;
  font-size: 30px;
}
.product-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-details {
  display: flex;
  gap: 20px;
}

.product-image {
  flex: 1;
}

.carousel-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  min-width: 100%;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  transform: scale(100%);
  transition: transform 1s ease;
}

@media (hover: hover) {
  .carousel-image:hover {
    transform: scale(110%);
  }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.carousel-dots {
  text-align: center;
  padding: 10px 0;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #bbb;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.dot.active {
  background: #333;
}

.product-info {
  flex: 1;
}

.price {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
}

.add-to-cart {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.add-to-cart:hover {
  background: #0056b3;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>