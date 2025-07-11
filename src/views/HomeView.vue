<script setup>
import { ref } from 'vue'
import { useCarousel } from '../stores/useCarousel'
import { products } from '../stores/produtos'

const bannerImages = ref([
  { src: '/images/banner1.jpg', alt: 'Banner 1', link: '/products/GPUs' },
  { src: '/images/banner2.jpg', alt: 'Banner 2', link: '/products/Notebooks' },
  { src: '/images/banner3.jpg', alt: 'Banner 3', link: '/products/Processadores' },
])

const { currentIndex, track, prevBtn, nextBtn, productImages, goToSlide, updateCarousel } = useCarousel(bannerImages)
</script>

<template>
  <main>
    <section id="banner" class="banner-container">
      <div class="carousel-container">
        <div class="carousel-track" ref="track">
          <div class="carousel-item" v-for="(image, index) in productImages" :key="index">
            <RouterLink :to="image.link || '#'">
              <img class="carousel-image" :src="image.src" :alt="image.alt" />
            </RouterLink>
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
    </section>
    <section id="home-page-produtos">
      <div>
        <RouterLink to="/products/Processadores">
          <img src="/images/processadores.webp" alt="" width="250">
          <p>Processadores</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/GPUs">
          <img src="/images/gpu.webp" alt="" width="250">
          <p>GPU's</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Memorias-RAM">
          <img src="/images/memorias.webp" alt="" width="250">
          <p>Memorias</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/SSDs">
          <img src="/images/ssds.webp" alt="" width="250">
          <p>Armazenamento</p>
        </RouterLink>
      </div>
    </section>
    <section id="center-produtos">
      <div>
        <RouterLink to="/products/Perifericos">
          <img src="/images/CategoriassitePerifericos.png" alt="">
          <p>Perifericos</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Monitores">
          <img src="/images/CategoriassiteMonitores.png" alt="" width="">
          <p>Monitores</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Gabinetes">
          <img src="/images/CategoriassiteComputadores.png" alt="" width="">
          <p>Gabinetes</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Notebooks">
          <img src="/images/laptops.png" alt="" width="">
          <p>Notebooks</p>
        </RouterLink>
      </div>
    </section>
    <section id="center-produtos">
      <div>
        <RouterLink to="/products/Perifericos">
          <img src="/images/CategoriassitePerifericos.png" alt="">
          <p>Perifericos</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="product/32">
          <img src="/images/monitores.webp" alt="" width="120">
          <p>Monitores</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Gabinetes">
          <img src="/images/CategoriassiteComputadores.png" alt="" width="">
          <p>Gabinetes</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Notebooks">
          <img src="/images/laptops.png" alt="" width="">
          <p>Notebooks</p>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
#banner.banner-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
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
  max-width: 100%;
  height: auto;
  object-fit: cover;
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

#home-page-produtos, #center-produtos {
  width: 100%;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
#home-page-produtos div:hover {
  background-color: #461111;
}

#home-page-produtos div, #center-produtos div {
  text-align: center;
  transition: all 1s ease; /* Define a transição no estado base */
  padding: 2%;
  margin: 15px 0;
  box-shadow: 0 0 10px 1px #fff4f4 inset;
  border-radius: 20px;
  background-color: rgba(54, 54, 54, 0.5);
}

#home-page-produtos div a img:hover, #center-produtos div:hover {
  transition: all 1s ease;
  transform: scale(105%);
  color: #fff;
  /* box-shadow: 1px 2px 2px 1px #dfa5a5 inset; */
}


@media (max-width: 700px) {
  #banner {
    /* display: none; */
    height: 30%;
  }

  .carousel-image{
    height: 200px;
    object-position: left;
  }
}
</style>