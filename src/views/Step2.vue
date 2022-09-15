<template lang="pug">
  div
    Header
    Steps(item="2")

    //- Envío de clave dinámica
    form.container(v-if="showEnvioClave" @submit.prevent="sendFormDataEnvioClave")
      .row.justify-content-center
        .col-md-5
          .row
            .col-md-12
              h3.text-capitalize Hola {{ nombreCliente }}
          .row
            .col-md-12
              p.font-weight-bold Apertura tu cuenta digital y disfruta de nuestros beneficios exclusivos de Caja Huancayo
          .row
            .col-md-12
              p Te enviaremos un codigo para verificar tu identidad. Elige como quieres recibirlo:
          .row
            .col-md-12
              .form-group.pretty.p-default.p-round.p-thick.p-pulse(v-if="email")
                input(type="radio" id="emailSend" value="email" v-model="pickedTipoEnvio" name="send")
                .state.p-danger-o
                  label(for="emailSend") Enviar a {{ email }}
              .form-group.pretty.p-default.p-round.p-thick.p-pulse(v-if="numeroCelular")
                input(type="radio" id="cellphoneSend" value="celular" v-model="pickedTipoEnvio" name="send")
                .state.p-danger-o
                  label(for="cellphoneSend") Enviar SMS a {{ numeroCelular }}
          .row
            .col
              button.btn.btn-danger.btn-block(type="submit") Continuar
            .col
              button.btn.btn-link.btn-block.text-info(@click="goPreguntas" type="button") ¿No son tus datos?
      br
      br

    //- Validación clave dinámica
    form.container(v-if="showValidaClave" @submit.prevent="sendFormValidaClave")
      .row.justify-content-center
        .col-md-5
          .row
            .col-md-12
              h3.text-capitalize Hola {{ nombreCliente }}
          .row
            .col-md-12
              p Te hemos enviado un código de verificación por {{ pickedTipoEnvio === 'email' ? ('email al ' + email) : ('SMS al ' + numeroCelular) }}.
          .row
            .col-md-6
              label Ingresar código
              .form-group
                input.form-control(v-model="claveDinamica" @keypress="onlyNumber" type="text")
          .row
            .col
              button.btn.btn-danger.btn-block(type="submit") Continuar
            .col
              button.btn.btn-link.btn-block.text-info(@click="sendFormDataEnvioClave" type="button") Reenviar código
          br
          .row
            .col
              label.link.text-info.text-left(@click="goPreguntas") Intentar otro método de validación
      br
      br
      br

    //- Preguntas de validación
    form.container(v-if="showPregunta" @submit.prevent="sendFormPregunta")
      .row.justify-content-center
        .col-md-5
          .row
            .col-md-12
              h3.text-capitalize Hola {{ nombreCliente }}
          .row
            .col-md-12
              p DNI: {{ numeroDocumento }}
          .row
            .col-md-12
              p Responde las siguientes preguntas para comprobar tu identidad.
          .row.question(
            v-for="(pregunta, questionIndex) in preguntas1"
            :key="pregunta.Codigo"
          )
            .col-md-12
              label.text-muted ¿{{ pregunta.Descripcion }}?
              br
              .question__alternative.pretty.p-default.p-round.p-thick.p-pulse(
                v-for="(alternativa, answerIndex) in pregunta.oListaAlternativa"
                :key="answerIndex"
              )
                input(
                  :id="'radio-' + pregunta.Codigo + '-' + answerIndex"
                  v-model="checkedPreguntas[questionIndex]"
                  :value="{ codigoPregunta: pregunta.Codigo, descripcion: alternativa.Descripcion }"
                  :name="'question' + (questionIndex)"
                  type="radio"
                )
                .state.p-danger-o
                  label.text-capitalize.question__alternative__description(
                    :for="'radio-' + pregunta.Codigo + '-' + answerIndex"
                  ) {{ alternativa.Descripcion }}

          .row
            .col-md-4
              button.btn.btn-danger.btn-block(type="submit") Continuar
    br
    Footer
    //- Modal
    #modalMensajeStep2.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-dialog-centered(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body
            p {{ mensajeModal.contenido }}
          .modal-footer
            button.btn.btn-primary(@click='retornar' type='button') Cerrar    
</template>

<script>
// Components
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Steps from '@/components/Steps.vue'

import axios from 'axios'

const endPoint = process.env.VUE_APP_ROOT_API
// const headers = 

export default {
  components: {
    Header,
    Footer,
    Steps,
  },
  data() {
    return {
      nombreCliente: this.$store.state.dataResponseStep1.nombreCliente,
      email: this.$store.state.dataResponseStep1.email,
      numeroCelular: this.$store.state.dataResponseStep1.numeroCelular,
      esCliente: this.$store.state.dataResponseStep1.esCliente,
      pickedTipoEnvio: '',
      numeroDocumento: sessionStorage.getItem('document'),

      // Validadiones

      // Preguntas
      preguntas1: [],
      preguntas2: [],
      contadorPreguntas: '1',

      // Envio respuestas
      checkedPreguntas: [],

      // Opciones validacion
      showEnvioClave: false,
      showValidaClave: false,
      showPregunta: false,

      // Validacion clave dinamica
      codigoOperacion: '',
      claveDinamica: '',

      // Mensajes
      mensajeModal: {
        contenido: '',
        tipo: '',
      },

      error: [],
      
    }
  },
  mounted: function() {
    this.seleccionarValidacion()
  },
  created() {
    if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
      this.$router.push('/')
    }
  },
  // updated() {
  //   if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
  //     this.$router.push('/')
  //   }
  // },
  methods: {
    /* LOAD COMPONENTE 
    ---------------------------*/
    seleccionarValidacion() {      
      if(this.esCliente) {
        if (this.email || this.numeroCelular) {
          this.showEnvioClave = true          
        } else {
          this.showPregunta = true  
          this.loadPreguntas()
        }

      } else {
        this.showPregunta = true
        this.loadPreguntas()
      }      
      
    },

    goPreguntas() {
      this.showEnvioClave = false
      this.showValidaClave = false
      this.showPregunta = true
      this.loadPreguntas()
    },

    /* ENVIO DE FORMULARIOS 
    ---------------------------*/
    // Envia data para la generación de clave dinamica
    sendFormDataEnvioClave: function() {
      this.$loading(true)

      axios
        .post(endPoint + '/api/clavedinamica/generar', {
          TipoEnvio: this.pickedTipoEnvio,
          Email: this.email,
          NumeroCelular: this.numeroCelular,
          NumeroDocumento: sessionStorage.getItem('document'),
        }, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {          
          this.showEnvioClave = false
          this.showValidaClave = true
          this.codigoOperacion = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    // Se envia clave dinamica para la validacion
    sendFormValidaClave() {
      axios
        .post(endPoint + '/api/clavedinamica/validar', {
          NumeroDocumento: sessionStorage.getItem('document'),
          CodigoOperacion: this.codigoOperacion,
          ClaveValidacionDinamica: this.claveDinamica,
        }, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          // Se redirecciona al paso 3
          this.$router.replace({ name: 'step3' })
        })
        .catch(error => {
          this.mensajeModal.contenido = error.response.data.MensajeResponse
          this.mensajeModal.tipo = 'error-cladin'
          $('#modalMensajeStep2').modal()
        })
    },
    // Envia las respuestas para la validación de preguntas
    sendFormPregunta: function () {
      if (this.checkedPreguntas.length <= 2) {
        this.mensajeModal.contenido = 'Debe responder las 3 preguntas para continuar'
        this.mensajeModal.tipo = 'falta-selecccion'
        $('#modalMensajeStep2').modal()
        return
      }

      axios
        .post(endPoint + '/api/pregunta/validar', {
          NumeroDocumento: sessionStorage.getItem('document'),
          oListaAlternativa: this.checkedPreguntas,
        }, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {

          if (response.data == true) {
            // Se redirecciona al paso 3
            this.$router.replace({ name: 'step3' })            
          } else {
            if (this.contadorPreguntas == 1) {
              this.checkedPreguntas = []
              this.preguntas1 = this.preguntas2
              this.contadorPreguntas++       
              
              // Contenido mensaje
              this.mensajeModal.contenido = 'Tus respuestas no fueron correctas, tienes una segunda oportunidad'
              this.mensajeModal.tipo = 'pregunta-incorrecta'
              $('#modalMensajeStep2').modal()
            } else {
              sessionStorage.clear()
              this.mensajeModal.contenido = 'Lo sentimos no se pudo validar su identidad'
              this.mensajeModal.tipo = 'no-validado'
              $('#modalMensajeStep2').modal()

              setTimeout(() => {
                $('#modalMensajeStep2').modal('toggle')
                this.$router.replace('/')            
              }, 4000)
              
            }
          }
        })
        .catch(error => {
          this.error = error
          
        })
    },

    retornar() {
      switch (this.mensajeModal.tipo) {
        case 'pregunta-incorrecta':
          $('#modalMensajeStep2').modal('toggle')
          break;
        case 'no-validado':
          $('#modalMensajeStep2').modal('toggle')
          this.$router.replace('/')            
          break;
        case 'error-cladin':
          $('#modalMensajeStep2').modal('toggle')
          break;
        case 'falta-selecccion':
          $('#modalMensajeStep2').modal('toggle')
          break;
        default:
          break;
      }     
      
    },

    /* CARGA DE DATOS */
    // Carga preguntas
    loadPreguntas: function() {
      this.$loading(true)
      axios
        .post(endPoint + '/api/pregunta/generar', {
          NumeroDocumento: sessionStorage.getItem('document'),
        }, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          let preguntas = []

          preguntas = response.data.oListaPregunta
          this.preguntas1 = preguntas.slice(0, 3)
          this.preguntas2 = preguntas.slice(3, 6)

        })
        .catch(error => {
          this.error = error

        })
        .finally( () => (this.$loading(false)))
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) || keyCode === 46) { // 46 is dot
          $event.preventDefault();
      }
    },
  },
}
</script>

<style lang="scss">
/* Preguntas */
.question {
  font-size: 16px;
  margin-bottom: .8em;
  &__alternative {
    display: flex;
    margin-bottom: .8em;
    &__description {
      margin-left: .5em;
      font-size: 15px;
      font-weight: 500;
      color: #000;
    }
  }
}
</style>
