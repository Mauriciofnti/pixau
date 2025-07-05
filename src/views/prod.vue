<template>
  <div class="carousel-container">
    <div class="carousel-track" ref="track">
      <div class="carousel-item" v-for="(image, index) in images" :key="index">
        <img class="carousel-image" :src="image.src" :alt="image.alt">
      </div>
    </div>
    <button class="carousel-btn prev" ref="prevBtn">❮</button>
    <button class="carousel-btn next" ref="nextBtn">❯</button>
    <div class="carousel-dots">
      <span
        class="dot"
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Perifericos',
  data() {
    return {
      currentIndex: 0,
      images: [
        { src: '/images/monitor.jpg', alt: 'Imagem 1' },
        { src: '/images/monitor2.jpg', alt: 'Imagem 2' },
        { src: '/images/monitor.jpg', alt: 'Imagem 3' },
      ],
    };
  },
  mounted() {
    // Acessa os elementos do DOM após o componente ser renderizado
    this.track = this.$refs.track;
    this.prevBtn = this.$refs.prevBtn;
    this.nextBtn = this.$refs.nextBtn;

    // Adiciona event listeners
    this.prevBtn.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
    this.nextBtn.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));

    // Autoplay
    this.autoplay = setInterval(() => {
      this.goToSlide(this.currentIndex + 1);
    }, 5000);

    // Pausar autoplay no hover
    this.track.addEventListener('mouseenter', () => clearInterval(this.autoplay));
    this.track.addEventListener('mouseleave', () => {
      this.autoplay = setInterval(() => {
        this.goToSlide(this.currentIndex + 1);
      }, 5000);
    });
  },
  beforeDestroy() {
    // Limpa o intervalo para evitar memory leaks
    clearInterval(this.autoplay);
  },
  methods: {
    updateCarousel() {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    },
    goToSlide(index) {
      this.currentIndex = index;
      if (this.currentIndex >= this.images.length) this.currentIndex = 0;
      if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
      this.updateCarousel();
    },
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
</style>