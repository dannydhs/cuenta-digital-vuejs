<template>
  <div>
    <header>
      <div class="head__container">
        <div class="head__logo">
          <img src="https://www.cajahuancayo.com.pe/images/logo.png" alt="Logo Caja Huancayo">
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
$color-primary-degrade: #C53030;

.head {
  &__container {
    background: linear-gradient(to right,                      
                      rgb(192, 25, 7),
                      rgb(233, 42, 65));
    display: flex;
  }
  &__logo {
    margin: .5em 1em;
    width: 200px;
    img {
      width: 100%;
    }
  }
}
</style>