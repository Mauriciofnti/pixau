import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useCarousel(images) {
  const currentIndex = ref(0)
  const track = ref(null)
  const prevBtn = ref(null)
  const nextBtn = ref(null)
  const autoplay = ref(null)

  const productImages = computed(() => {
    // Garante que o src seja uma string e não um Proxy
    return images.value ? images.value.map(item => ({
      src: typeof item.src === 'object' ? item.src.value || item.src.toString() : item.src,
      alt: item.alt,
      link: item.link || '#'
    })) : []
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
    if (images.value) {
      currentIndex.value = index
      if (currentIndex.value >= images.value.length) currentIndex.value = 0
      if (currentIndex.value < 0) currentIndex.value = images.value.length - 1
      updateCarousel()
    }
  }

  return {
    currentIndex,
    track,
    prevBtn,
    nextBtn,
    productImages,
    goToSlide,
    updateCarousel
  }
}