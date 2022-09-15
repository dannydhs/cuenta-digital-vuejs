<template lang="pug">
  div
    Header
    Steps(item="4")
    .container
      .row.justify-content-center
        .col-md-5
          .row
            .col-md-12
              h3 Confirmación de datos
          br          
          form(@submit.prevent='sendFormCuenta')
            div(v-show='showSeccionEmpleador')
              .form-group.row
                label.col-sm-4.col-form-label(for='staticEmail') RUC empleador
                .col-sm-8
                  p {{ $store.state.dataUsuarioStep3.ruc }}
              .form-group.row
                label.col-sm-4.col-form-label(for="staticEmail") Razon social
                .col-sm-8
                  p {{ $store.state.dataUsuarioStep3.razonSocial }}
            .form-group.row
              label.col-sm-4.col-form-label(for="staticEmail") Email
              .col-sm-8
                p {{ $store.state.dataUsuarioStep3.emailEnvio }}
            .form-group.row
              label.col-sm-4.col-form-label(for="staticEmail") Tipo de Cuenta
              .col-sm-8
                p {{ nombreTipoCuenta }}
            .form-group.row
              label.col-sm-4.col-form-label(for="staticEmail") Agencia
              .col-sm-8
                p {{ $store.state.dataUsuarioStep3.nombreOficina }}
            .form-group.row
              label.col-sm-4.col-form-label(for="staticEmail") Moneda
              .col-sm-8
                p {{ $store.state.dataUsuarioStep3.monedaApertura === '1' ? 'Soles' : 'Dolares' }}
            small
              | Al darle clic en Aceptar declaro que he le&iacute;do y acepto los 
              u.text-danger.btn-link(style='cursor: pointer;')
                a(href='https://www.cajahuancayo.com.pe/PCM_Archivos/PCM_ArcTraTasInt/Contrato%20de%20Depositos%20y%20Servicios%20Financieros%20V11-1.pdf' target='_blank') T&eacute;rminos y Condiciones
            br
            br
            .row
              .col-md-4
                button#btnAceptar.btn.btn-danger.btn-block(type="submit") Aceptar
            br
            small.text-secondary
              | La constancia de esta operación y los documentos relacionados a ella, serán enviados al correo electrónico que registró
    
    //- Modal
    #modalStep2.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-lg(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Informaci&oacute;n
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body
            | {{ modalMensaje }}
          .modal-footer
            button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
    br
    Footer
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Steps from '@/components/Steps.vue'

import axios from 'axios'
import { runInThisContext } from 'vm';

const endPoint = process.env.VUE_APP_ROOT_API

export default {
  components: {
    Header,
    Footer,
    Steps,
  },
  data() {
    return {
      showSeccionEmpleador: false,
      nombreTipoCuenta: '',
      error: [],

      modalMensaje: '',
    }
  },
  mounted() {
    this.loadData()
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
  methods: {
    loadData() {
      // Cargando seccion de empleador
      let tipoCuenta = this.$route.params.cuenta

      if (tipoCuenta === 'cuenta-corriente') {
        this.nombreTipoCuenta = 'Ahorro Corriente'
      } else if (tipoCuenta === 'cuenta-remuneracion') {
        this.showSeccionEmpleador = true
        this.nombreTipoCuenta = 'Sueldo Efectivo'
      } else if(tipoCuenta === 'cuenta-cts'){
        this.showSeccionEmpleador = true
        this.nombreTipoCuenta = "CTS"
      } else if (tipoCuenta === 'orden-pago') {
        this.nombreTipoCuenta = 'Ordenes de Pago'
      } else {
        this.$router.replace('/')
      }

    },
    sendFormCuenta() {
      this.$loading(true)
      document.getElementById('btnAceptar').disabled = true

      let tipoCuenta = this.$route.params.cuenta
      let codigoTipoProducto = ''
      let tipoSubProducto = ''
      let codigoCaracteristica = ''
      let urlApi = endPoint + '/api/aperturacuenta/ahorrocorriente'

      if (tipoCuenta === 'cuenta-corriente') {
        codigoTipoProducto = '21'
        tipoSubProducto = '01'
        codigoCaracteristica = 'N'
      } else if (tipoCuenta === 'cuenta-remuneracion') {
        codigoTipoProducto = '21'
        tipoSubProducto = '01'
        codigoCaracteristica = 'R'
      } else if (tipoCuenta === 'orden-pago') {
        codigoTipoProducto = '21'
        tipoSubProducto = '03'
        codigoCaracteristica = 'N'
      } else if(tipoCuenta === 'cuenta-cts'){
        codigoTipoProducto = '23'
        tipoSubProducto = '08',
        codigoCaracteristica = 'N'
      } else {
        return
      }

      axios
        .post(urlApi, {
          DocumentoIdentidad: sessionStorage.getItem('document'),
          MonedaApertura: this.$store.state.dataUsuarioStep3.monedaApertura,
          CodigoTipoProducto: codigoTipoProducto,
          TipoSubProducto: tipoSubProducto,
          CodigoCaracteristica: codigoCaracteristica,
          Email: this.$store.state.dataUsuarioStep3.emailEnvio,
          AutorizaConcentimientoDatos: sessionStorage.getItem('autDat'),
          CodigoEmpleador: this.$store.state.dataUsuarioStep3.codigoEmpleador,
          RUCEmpleador: this.$store.state.dataUsuarioStep3.ruc,
          RazonSocialEmpleador: this.$store.state.dataUsuarioStep3.razonSocial,
          Oficina: this.$store.state.dataUsuarioStep3.oficina,
          NumeroCelular: sessionStorage.getItem('numcel'),
          // Domicilio
          CodigoDepartamento: this.$store.state.dataUsuarioStep3.codigoDepartamento,
          CodigoProvincia: this.$store.state.dataUsuarioStep3.codigoProvincia,
          CodigoDistrito: this.$store.state.dataUsuarioStep3.codigoDistrito,
          CodigoZona: this.$store.state.dataUsuarioStep3.codigoZona,
          CodigoTipoVia: this.$store.state.dataUsuarioStep3.codigoTipoVia,
          CodigoViaAcceso: this.$store.state.dataUsuarioStep3.codigoVia,
          NumeroDomicilio: this.$store.state.dataUsuarioStep3.numeroDomicilio,
          NumeroDepartamento: this.$store.state.dataUsuarioStep3.numeroManzana,
          NumeroManzana: this.$store.state.dataUsuarioStep3.numeroLote,
          NumeroLote: this.$store.state.dataUsuarioStep3.numeroDepartamento,
        }, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.$store.commit('setCodigoCuenta', response.data)
          if (response.data.CodigoCuenta.trim() !== '') {
            // Redireccionando al detalle de la cuenta creada
            this.$router.replace({ name: 'detallecuenta' })
          }
        })
        .catch(error => {
          this.error = error
          this.modalMensaje = error.response.data.MensajeResponse
          $('#modalStep2').modal()

        })
        .finally( () => (this.$loading(false)))
    }
  },
}
</script>

<style lang="scss">
.modal-body {
  p {
   font-size: 14px 
  }
}
</style>