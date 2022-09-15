<template lang="pug">
  div
    Header
    div(style={width: '100%', border: '1px solid #eee'})
    br
    .container
      .row.justify-content-center
        .col-md-5
          .row
            .col-md-12
              h2 ¡Felicitaciones!
          .row
            .col-md-12
              p.text-justify
                | Tu cuenta de 
                strong.text-danger {{ nombreTipoCuenta }}
                |  ha sido creada{{ mensajeAdicional }} Te hemos enviado un e-mail a 
                strong.text-danger {{ $store.state.dataUsuarioStep3.emailEnvio }}
                |  con la confirmación.
          .row
            .col-md-12
              h3 Tus datos          
          .form-group.row
            label.col-sm-5.col-form-label(for="staticEmail") Tu número de cuenta
            .col-sm-7
              p {{ $store.state.dataResponseStep4.codigoCuenta }}
          .form-group.row
            label.col-sm-5.col-form-label(for="staticEmail") Moneda
            .col-sm-7
              p {{ $store.state.dataUsuarioStep3.monedaApertura === '1' ? 'Soles' : 'Dolares' }}
          .form-group.row
            label.col-sm-5.col-form-label(for="staticEmail") Fecha
            .col-sm-7
              p {{ dateNow }}
          .form-group.row
            .col-sm-12
              p
                strong.text-danger {{ $store.state.dataResponseStep4.mensajeNotificacion }}
    br
    .container
      .row.justify-content-center
        .col-md-6
          .infoTarjeta
            h2.infoTarjeta__title.text-center ¿AÚN NO TIENES TU TARJETA RAPICARD DÉBITO CHIP?
            p.text-center Acércate a la agencia más cercana con tu DNI y recoge tu tarjeta.
            .infoTarjeta__item
              .infoTarjeta__item__imgContent
                img(src="@/assets/ubica_agencia.png" alt="Ubica la agencia más cercana")
              .infoTarjeta__item__description
                h3 1. Ubica la agencia más cercana.
                a(href="https://www.cajahuancayo.com.pe/PCM_RedAgencias/PCM_frmMapAgencias.aspx?cCodigo=1" target="_blank")
                 | Ubicanos
            br
            .infoTarjeta__item
              .infoTarjeta__item__imgContent
                img(src="@/assets/identifícate_cliente_digital.png" alt="Cliente digital")
              .infoTarjeta__item__description
                h3 2. Identificate como cliente digital.
            br
            .infoTarjeta__item
              .infoTarjeta__item__imgContent
                img(src="@/assets/presenta_dni.png" alt="DNI")
              .infoTarjeta__item__description
                h3 3. Presenta tu DNI y listo.
    br
    Footer
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      dateNow: new Date(),
      nombreTipoCuenta: '',
      mensajeAdicional: ''
    }
  },
  mounted() {
    this.loadDataInicial()
  },
  created() {
    if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
      this.$router.push('/')
    }
  },
  updated() {
    if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
      this.$router.push('/')
    }
  },
  destroyed() {
    // Se elimina el storage
    sessionStorage.clear()
  },
  methods: {
    loadDataInicial() {
      let tipoCuenta = this.$route.params.cuenta
      this.mensajeAdicional = '.'
      if (tipoCuenta === 'cuenta-corriente') {
        this.nombreTipoCuenta = 'ahorro corriente'
      } else if (tipoCuenta === 'cuenta-remuneracion') {
        this.showSeccionEmpleador = true
        this.nombreTipoCuenta = 'sueldo efectivo'
      } else if (tipoCuenta === 'cuenta-cts'){
        this.showSeccionEmpleador = true
        this.nombreTipoCuenta = 'CTS'
        this.mensajeAdicional = ', debes comunicar a tu EMPLEADOR para que realice el Traslado de CTS o deposito semestral.'
      } else if (tipoCuenta === 'orden-pago') {
        this.nombreTipoCuenta = 'ordenes de pago'
      } else {
        this.$router.replace('/')
      }
      //this.dateNow = this.dateNow.getDate() + '-' + (this.dateNow.getMonth()+1) + '-' + this.dateNow.getFullYear()
  
      // Inicializando fecha actual
      Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
              ].join('-');
      };

      var date = new Date();
      this.dateNow = date.yyyymmdd();
    },
  },
}
</script>

<style lang="scss">
.infoTarjeta {
  // text-align: center;
  &__title {
    font-size: 22px;
  }
  &__item {
    display: flex;

    &__imgContent {
      width: 100px;
      border-radius: 50%;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    &__description {
      align-self: center;
      margin-left: 1em;

    }
    h3 {
      font-size: 22px;
    }
  }
}
</style>