```vue
<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { ref } from 'vue'

const cartStore = useCartStore()
const isMenuOpen = ref(false)

// Função para alternar o estado do menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Função para fechar o menu ao clicar em um link
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header>
    <RouterLink to="/">LOGO-BANNER</RouterLink>
    <div class="nav-container">
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        ☰
      </button>
      <nav :class="{ 'menu-open': isMenuOpen }">
        <ul>
          <li>
            <RouterLink to="/products/Monitores" @click="closeMenu">Monitores</RouterLink>
          </li>
          <li>
            <RouterLink to="/products/Processadores" @click="closeMenu">Processadores</RouterLink>
          </li>
          <li>
            <RouterLink to="/products/Memorias-RAM" @click="closeMenu">Memórias RAM</RouterLink>
          </li>
          <li>
            <RouterLink to="/products/Placas-Mae" @click="closeMenu">Placas-mãe</RouterLink>
          </li>
          <li>
            <RouterLink to="/products/GPUs" @click="closeMenu">Placas de Vídeo</RouterLink>
          </li>
          <li>
            <RouterLink to="/products/SSDs" @click="closeMenu">SSDs</RouterLink>
          </li>
          <li>
            <RouterLink to="/products/Perifericos" @click="closeMenu">Periféricos</RouterLink>
          </li>
          <!-- <li>
            <RouterLink to="/notebook" @click="closeMenu">Notebooks</RouterLink>
          </li>
          <li>
            <RouterLink to="/desktop" @click="closeMenu">Desktops</RouterLink>
          </li>
          <li>
            <RouterLink to="/cart" @click="closeMenu">
              Carrinho ({{ cartStore.cartItemCount }})
            </RouterLink> 
          </li>-->
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #461111;
  color: #fff;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  margin: 0;
  z-index: 1000;
}

.nav-container {
  position: relative;
}

nav {
  max-width: 100%; /* Garante que o nav não ultrapasse a largura do header */
}

nav ul {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  list-style: none;
  max-width: 100%; /* Limita a largura da lista */
  margin: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  font-size: 20px;
}

nav ul li a:hover {
  box-shadow: 0px 2px #c78080;
  color: #c78080;
  /* font-size: 25px; */
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 20px;
  color: #fff;
}

/* Menu móvel */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  nav {
    display: none;
  }

  nav.menu-open {
    display: block;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    z-index: 1000;
    width: 200px; /* Define uma largura fixa para o menu móvel */
    max-width: 100vw; /* Garante que não ultrapasse a largura da tela */
    box-sizing: border-box; /* Inclui padding na largura total */
  }

  nav.menu-open ul {
    flex-direction: column;
    gap: 10px;
  }

  nav.menu-open ul li {
    text-align: right;
  }

  nav.menu-open ul li a {
    display: block;
    padding: 0.5rem;
  }
}

/* Tela grande */
@media (min-width: 769px) {
  nav {
    display: block;
  }

  .menu-toggle {
    display: none;
  }
}

/* Evita overflow horizontal */
body {
  overflow-x: hidden;
  padding-top: 60px; /* Ajuste conforme a altura do header */
}
</style>