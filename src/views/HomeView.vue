<script setup>
</script>

<template>
  <main>
    <section id="banner">
      <div>
        <a href="#"><img src="/images/banner1.jpg" alt=""></a>
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
  </main>
</template>
<style scoped>
#banner div {
    overflow: hidden;
}

#banner div img {
    max-width: 100%;
}

#home-page-produtos, #center-produtos {
  width: 100%;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

#home-page-produtos div, #center-produtos div {
  text-align: center;
  transition: all 1s ease; /* Define a transição no estado base */
  padding: 2%;
}

#home-page-produtos div img {
  border-radius: 15px;
}
#home-page-produtos div:hover, #center-produtos div:hover {
  transition: all 1s ease;
  transform: scale(110%);
}

@media (max-width: 700px) {
  #banner {
    display: none;
  }
}
</style>