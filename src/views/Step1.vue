<template lang="pug">
  div
    Header
    section.container-info
      .info__image
        img.image(src='@/assets/portada2.png' alt='Portada step 1')
        .info__cap
        .content-text
      .info__data
        .container
          .row.justify-content-center
            .col-sm-9
              .row
                .col-md-10
                  h3 Ingresa tu información personal actual
              br
              form(@submit.prevent="sendForm")
                .row
                  .col-md-6
                    .form-group
                      label(for="inputDocument") Número de DNI
                      input(
                        v-model="numeroDocumento" 
                        @keypress="onlyNumber"
                        type="text" 
                        :class="{'form-control': true, 'is-invalid': submitted && $v.numeroDocumento.$error }"  
                        id="inputDocument" 
                        maxlength="8"
                        placeholder="Ingrese DNI"
                      )
                      .error(v-if="submitted && $v.numeroDocumento.$error")
                        div(v-if="!$v.numeroDocumento.required") El documento es requerido
                        div(v-if="!$v.numeroDocumento.minLength") El documento debe tener al menos {{$v.numeroDocumento.$params.minLength.min}} dígitos
                br
                .row
                  .col-md-10
                    .form-group
                      label(for="inputEmail") Email
                      input(
                        v-model="email" 
                        type="email" 
                        :class="{'form-control': true, 'is-invalid': submitted && $v.email.$error }"  
                        id="inputEmail" 
                        maxlength="60"
                        placeholder="Ingrese email"
                      )
                      .error(v-if="submitted && $v.email.$error")
                        div(v-if="!$v.email.required") El email es requerido
                        div(v-if="!$v.email.email") El email es invalido
                br
                .row
                  .col-md-10
                    .form-row
                      .form-group.col-md-6
                        label(for="inputState") Operador
                        select#inputState(
                          v-model="operadorMovil"
                          :class="{'form-control': true, 'is-invalid': submitted && $v.operadorMovil.$error }" 
                        )
                          option(value="" disabled) Seleccione
                          option(value="1") Movistar
                          option(value="2") Claro
                          option(value="3") Entel
                          option(value="4") Bitel
                        .error(v-if="submitted && $v.operadorMovil.$error")
                          div(v-if="!$v.operadorMovil.required") El operador es requerido
                      .form-group.col-md-6
                        label(for="inputPhone") Celular
                        input(
                          v-model="numeroCelular" 
                          @keypress="onlyNumber"
                          type="text" 
                          :class="{'form-control': true, 'is-invalid': submitted && $v.numeroCelular.$error }" 
                          id="inputPhone"
                          maxlength="9"
                        )
                        .error(v-if="submitted && $v.numeroCelular.$error")
                          div(v-if="!$v.numeroCelular.required") El celular es requerido
                          div(v-if="!$v.numeroCelular.minLength") El celular debe tener al menos {{$v.numeroCelular.$params.minLength.min}} dígitos
                br
                .row
                  .col-md-12
                    .pretty.p-default.p-thick.p-pulse
                      input#exampleCheck1.form-check-input(v-model="aceptaTratamientoDatos" type="checkbox")
                      .state.p-danger-o
                        label.form-check-label(for="exampleCheck1")
                    span
                      | He leído y acepto la 
                      u(
                        data-toggle="modal" data-target="#exampleModal" 
                        style={color: 'teal', cursor: 'pointer'}
                      ) Política de tratamiento de datos personales.
                br
                #recaptcha.g-recaptcha
                //- <!-- data-sitekey="6LewlKcUAAAAAEm9Qr_unKHMKOj0EvtwxZ-_ld2h" -->
                br
                button.btn.btn-danger.btn-lg(type="submit") Siguiente

    //- Modal
    #exampleModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-lg(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title CONSENTIMIENTO PARA EL TRATAMIENTO DE DATOS PERSONALES
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body.text-justify
            p
              | DECLARO haber sido informado sobre la Ley de Protecci&oacute;n de Datos Personales, Ley N&deg; 29733, su Reglamento aprobado mediante D.S. 003-2013-JUS y sus alcances, por lo que:
            p
              | OTORGO MI CONSENTIMIENTO de forma voluntaria, previa, libre, expresa, informada e inequ&iacute;voca
              | para que mis datos personales y/o sensible sobre nombre, apellido, documento de identidad, mis datos
              | biom&eacute;tricos (huella dactilar), nacionalidad, estado civil, domicilio, ubicaci&oacute;n geogr&aacute;fica, correo
              | electr&oacute;nico, tel&eacute;fono, ocupaci&oacute;n, actividades que realizo y otros referidos a mis ingresos econ&oacute;micos,
              | estudios, gastos y otros relacionados a mis egresos econ&oacute;micos, estado de salud, bienes y otros sobre
              | mi patrimonio, para que sean tratados por la CMAC HUANCAYO S.A., dentro de los alcances de la
              | Ley N&deg; 29733 y su Reglamento.
            p
              | Con &eacute;ste consentimiento permito que CMAC HUANCAYO S.A. trate mis datos personales para: (i)
              | conservarlos, almacenarlos y procesarlos en su banco de datos, conforme a las formas previstas por
              | Ley, (ii) enviarme ofertas comerciales, publicidad e informaci&oacute;n en general de los productos y/o
              | servicios de CMAC HUANCAYO S.A. y/o de terceros vinculados o no*, (por ejemplo cuentas de
              | ahorros, pr&eacute;stamos, campa&ntilde;as, convenios de financiamiento para adquirir inmuebles, veh&iacute;culos, bienes
              | ecol&oacute;gicos y otros), lo que pueden hacer tambi&eacute;n a trav&eacute;s de terceras personas*, (iii) evaluar mi
              | comportamiento en el sistema financiero y capacidad de pago (iv) que puedan decidir si se me otorga
              | el(los) producto(s) y/o servicio(s) que solicite, (v) realizar el an&aacute;lisis de perfiles y fines estad&iacute;sticos e
              | hist&oacute;ricos, (vi) transfiera esta informaci&oacute;n a terceros*, vinculados o no a CMAC HUANCAYO S.A.
              | dentro del territorio nacional (por ejemplo: empresas de mensajer&iacute;a, auditor&iacute;a, empresas recuperadoras
              | de cr&eacute;ditos), para la ejecuci&oacute;n de los servicios prestados u ofrecidos por la CMAC HUANCAYO S.A. y
              | para los fines autorizados en el presente documento, (vii) para que me llamen y realicen preguntas
              | referidas a la calidad de servicio y/o de riesgo reputacional.
            p
              | Esta autorizaci&oacute;n estar&aacute; vigente inclusive despu&eacute;s del vencimiento de las operaciones y/o de las
              | relaciones contractuales y/o comerciales que mantenga o pudiera mantener con CMAC HUANCAYO
              | S.A., para los fines autorizados en el presente documento. En ese sentido, declaro haber sido
              | informado de que en caso no otorgue este consentimiento, mis datos personales solo ser&aacute;n utilizadas
              | (tratadas) para la ejecuci&oacute;n (desarrollo) y cumplimiento de las relaciones contractuales y/o uso de los
              | servicios financieros que mantenga con CMAC HUANCAYO S.A.
            p
              | Por &uacute;ltimo, DECLARO, haber sido informado que en cualquier momento puedo ejercer mi derecho de
              | acceso, informaci&oacute;n, actualizaci&oacute;n, rectificaci&oacute;n, oposici&oacute;n o cancelaci&oacute;n de datos personales,
              | descargando el formato de solicitud de derechos ARCO desde la p&aacute;gina web institucional de CMAC
              | HUANCAYO S.A. y envi&aacute;ndolo a la direcci&oacute;n de correo electr&oacute;nico arco@cajahuancayo.com.pe con el
              | asunto &ldquo;Derechos ARCO&rdquo; o de forma presencial a trav&eacute;s de sus agencias a nivel nacional.
              | Finalmente me informaron que puedo revocar &eacute;ste consentimiento, presentando una solicitud escrita en
              | cualquiera de las oficinas de CMAC Huancayo S.A.
            p
              | * Los cu&aacute;les podr&aacute; visualizarse en la p&aacute;gina web de la Caja Huancayo, 
              a(href='https://www.cajahuancayo.com.pe/' target='_blank') www.cajahuancayo.com.pe
          .modal-footer
            button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar

    //- Modal
    #modalMsj.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-dialog-centered(role='document')
        .modal-content
          .modal-body
            h3 {{ modal.titulo }}
            p {{ modal.descripcion }}
          .modal-footer
            button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
    AppMovil
    Footer
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AppMovil from '@/components/AppMovil.vue'
import axios from 'axios'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'step1',
  components: {
    Header,
    Footer,
    AppMovil
  },
  data() {
    return {
      rcapt_sig_key: "6LewlKcUAAAAAEm9Qr_unKHMKOj0EvtwxZ-_ld2h",
      rcapt_id: 0, // will be used later
      // Datos Formulario
      numeroDocumento: '',
      email: '',
      operadorMovil: '',
      numeroCelular: '',
      aceptaTratamientoDatos: true,
      // Respuesta
      responseAuthenticate: [],
      // Carga
      loading: false,

      modal: {
        titulo: '',
        descripcion: '',
      },

      submitted: false,
    }
  },
  validations: {
    numeroDocumento: {
      required,
      minLength: minLength(8)
    },
    numeroCelular: {
      required,
      minLength: minLength(9)
    },
    email: {
      required,
      email
    },
    operadorMovil: {
      required
    }
  },
  methods: {
    sendForm(e) {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;    
      }

      let response = grecaptcha.getResponse();
      if(response.length == 0) {
        this.modal.titulo = ''
        this.modal.descripcion = 'Por favor verifique la validación captcha'
        $('#modalMsj').modal()
        return
      }
      
      this.$loading(true)
      axios
        .post(process.env.VUE_APP_ROOT_API + '/api/login/authenticate', {
          NumeroDocumento: this.numeroDocumento,
          Email: this.email,
          OperadorMovil: this.operadorMovil,
          NumeroCelular: this.numeroCelular,
          PoliticaTratamientoDatos: '1',
        })
        .then(response => {
          this.responseAuthenticate = response.data

          // Asignacion de variables en el store
          let dataUsuario = {
            numeroDocumento: this.numeroDocumento,
            email: this.email,
            operadorMovil: this.operadorMovil,
            numeroCelular: this.numeroCelular,
          }
          let dataResponse = {
            nombreCliente: this.responseAuthenticate.Nombre,
            numeroCelular: this.responseAuthenticate.NumeroCelular,
            email: this.responseAuthenticate.Email,
            esCliente: this.responseAuthenticate.EsCliente,//---Se agrego a session
          }
          this.$store.commit('setDatoUsuarioStep1', dataUsuario)
          this.$store.commit('setDataResponseStep1', dataResponse)
          this.$store.commit('setTipoCuenta', this.$route.params.cuenta)

          // Asignaciones a sessionStorage
          sessionStorage.setItem('token', this.responseAuthenticate.Token)
          sessionStorage.setItem('document', this.responseAuthenticate.NumeroDocumento)
          sessionStorage.setItem('esCliente', this.responseAuthenticate.EsCliente)
          sessionStorage.setItem('autDat', this.aceptaTratamientoDatos)
          sessionStorage.setItem('numcel', this.numeroCelular)
          this.$store.commit('setToken', this.responseAuthenticate.Token)

          // Redireccionando al paso 2
          this.$router.replace({ name: 'step2' })
        })
        .catch(error => {
          this.modal.titulo = 'Reinténtalo más tarde'
          this.modal.descripcion = 'En estos momentos no podemos atenderte. Por favor acercate a nuestras agencias'
          $('#modalMsj').modal()
        })
        .finally( () => (this.$loading(false)))
    },
    initReCaptcha: function() {
      var self = this;
      setTimeout(function() {
        if(typeof grecaptcha === 'undefined') {
          self.initReCaptcha();
        }
        else {
          grecaptcha.render('recaptcha', {
            sitekey: '6LewlKcUAAAAAEm9Qr_unKHMKOj0EvtwxZ-_ld2h',
            // size: 'invisible',
            // badge: 'inline',
            callback: self.submit
          });
        }
      }, 100);
    },
    validate: function() {
        // your validations...
        // ...
        grecaptcha.execute();
    },
    onlyNumber($event) {      
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) || keyCode === 46) { // 46 is dot
          $event.preventDefault();
      }
    },

  },
  mounted() {
    this.initReCaptcha()
    sessionStorage.clear()
  }
}
</script>


<style scoped lang="scss">
.container-info {
  display: flex; 
}
.info {
  &__image {
    width: 50%;
    //filter: brightness(0.5);
    position: relative;
  }
  &__cap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(#000, .2)
  }
  &__data {
    // padding: 2em;
    z-index: 2;
    width: 50%;
    background: #fafafa;
    .container {
      margin-top: 2em;
    }
  }
}

@media (max-width: 992px) {
  .container-info {
    flex-direction: column;
  }

  .info {
    &__image {
      display: none;
    }
    &__data {
      width: 100%;
    }
  }
}
</style>