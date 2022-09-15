<template>
  <div>
    <section class="app">
      <div class="app__title">
        Descarga el APP de Caja Huancayo
      </div>
      <div class="app__description">
        Realiza tus operaciones desde tu smartphone
      </div>
      <div class="insignia">
        <a class="insignia__image-container insignia__image-container--playstore" target="_blank" href='https://play.google.com/store/apps/details?id=com.cajahuancayo.cajahuancayo.appcajahuancayo&hl=es_PE&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
          <img alt='Disponible en Google Play' src='@/assets/google-play-badge-i.png'/>
        </a>
        <a class="insignia__image-container insignia__image-container--appstore" target="_blank" href='https://apps.apple.com/pe/app/caja-huancayo/id1423332783'>
          <img alt='Disponible en App Store' src='@/assets/Download_on_the_App_Store_Badge_ES_RGB_blk_100217.svg'/>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppMovil'
}
</script>

<style lang="scss">
.app {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 3em 0;
  &__title {
    color: #333;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
  }
  &__description {
    color: #333;
    text-align: center;
    font-size: 18px;
    margin-bottom: 1em;
  }
  .insignia {
    display: flex;
    justify-content: center;
    &__image-container {
      display: block;
      height: 60px;
      padding: 0;
      &--playstore {
        margin-right: 2em;
      }
      img {
        display: block;
        height: 100%;
      }
    }
  }
  
}
</style>