<template lang="pug">
  div
    Header
    Steps(item='3')
    .container
      .row.justify-content-center
        .col-md-6
          form(@submit.prevent="sendFormCaracteristicaCuenta")
            //- consulta empleador
            section(v-show="showEmpleador")
              .row
                .col-md-12
                  h3 Datos laborales

              div(v-show="dataRemuneracion.showRuc" class="row")
                .col-md-10
                  label(for='') RUC de la empresa
                  .form-group
                    input(
                      v-model="dataRemuneracion.ruc"
                      @keypress="onlyNumber"
                      id="rucempleador"
                      type="text"
                      maxlength="11"
                      class="form-control"
                    )
              p(v-show="dataRemuneracion.msgEmpleador" class="text-justify") En estos momentos no podemos validar el RUC. Por favor continue con el proceso ingresando el ruc y razón social de su empleador
              a(href="http://www.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaMovil.jsp" target="_blank") Encuentra el RUC &#8250;
              br
              br
              div(v-show="dataRemuneracion.showRazon" class="row")
                .col-md-10
                  label(for="") Razón social
                  .form-group
                    input(
                      v-model="dataRemuneracion.razonSocial"
                      type="text"
                      id="razonsocial"
                      class="form-control"
                    )

              div(v-show="dataRemuneracion.showBtnConsultaEmpleador" class="row")
                .col-md-4
                  span(@click="consultaEmpleador" class="btn btn-danger btn-block") {{ dataRemuneracion.tipoEnvioEmpleador == 'consulta' ? 'Consultar' : 'Registrar' }}
            //- ./consulta empleador

            //- ingreso de datos cuenta
            section(v-show="showDataCuenta")
              .row
                .col-md-12
                  h3.text-justify ¿Donde deseas utilizar tu nueva cuenta?
              .row
                .col-md-4
                  label(for='listaDepartamento') Departamento
                  select(
                    v-model='selectedDepartamento'
                    @change='loadProvincias'
                    id='listaDepartamento'
                    class='form-control'
                    required
                  )
                    option(disabled value='') Seleccione
                    option(
                      v-for='(departamento, index) in departamentos' :key='index'
                      :value='departamento.Codigo'
                      v-text='departamento.Nombre'
                    )
                .col-md-4
                  label(for='listaProvincia') Provincia
                  select(
                    v-model="selectedProvincia"
                    @change="loadAgencias"
                    id="listaProvincia"
                    class="form-control"
                    required
                  )
                    option(disabled value='') Seleccione
                    option(
                      v-for="(provincia, index) in provincias" :key="index"
                      :value="provincia.Codigo"
                      v-text="provincia.Nombre"
                    )
                .col-md-4
                  label(for='') Agencia
                  select(
                    v-model="selectedAgencia"
                    id="listaAgencia"
                    class="form-control"
                    required
                  )
                    option(disabled value='') Seleccione
                    option(
                      v-for="(agencia, index) in agencias" :key="index"
                      :value="agencia.Codigo"
                      v-text="agencia.Descripcion"
                    )
              br
              .row(v-if="$route.params.cuenta!='cuenta-cts'")
                .col-md-12
                  div(class="alert alert-primary text-justify" role="alert")
                    | Puedes usar tu cuenta a nivel nacional. Si deseas retirar o depositar dinero por ventanilla en agencias
                    | a nivel nacional en una ciudad diferente a la que escogiste, se te cobrará una comisión, establecido en
                    | nuestro
                    | <a href="https://www.cajahuancayo.com.pe/PCM_Archivos/PCM_ArcTraTasInt/CATEGORIA%20-20181017%20-%20v%2016.pdf" target="_blank" class="text-danger">Tarifario de Comisiones y Gastos de Ahorro</a>.

              .row
                .col-md-12
                  h3 Datos personales
              .row
                .col-md-8
                  label Email
                  .form-group
                    input(v-model.trim="$v.email.$model" type="email" class="form-control" required)
                    div(class="error" v-if="$v.email.$error") El email es requerido.
              .row
                .col-md-8
                  label Confirma tu email
                  .form-group
                    input(v-model.trim="$v.confirmEmail.$model" type="email" class="form-control" required)
                    //- <div class="error" v-if="!$v.confirmEmail.required">El email es requerido.</div>
                  div(class="error" v-if="!$v.confirmEmail.sameAsEmail") Los emails deben ser iguales.
              br
              .row
                .col-md-10
                  label ¿En que moneda quieres aperturar tu cuenta?
                  .radio-group
                    input(v-model="checkedMoneda" type="radio" id="radioSoles" name="moneda" value="1")
                    label(for="radioSoles") Soles
                    input(v-model="checkedMoneda" type="radio" id="radioDolares" name="moneda" value="2")
                    label(for="radioDolares") Dolares

              br

              //- Datos de domicilio
              article(v-if='domicilio.showDomicilio')
                .row
                  .col-md-12
                    h3 Datos de domicilio
                .row.form-group
                  .col-md-4
                    label(for='') Departamento
                    select(
                      v-model="domicilio.selectedDepartamento"
                      @change='loadProvinciasAll'
                      class="form-control"
                      required
                    )
                      option(disabled value='') Seleccione
                      option(
                        v-for="(item, index) in departamentos" :key="index"
                        :value="item.Codigo"
                        v-text="item.Nombre"
                      )
                  .col-md-8
                    label(for='') Provincia
                    select(
                      v-model="domicilio.selectedProvincia"
                      @change='loadDistritos'
                      id='domicilio-provincia'
                      class="form-control"
                      required
                    )
                      option(disabled value='') Seleccione
                      option(
                        v-for="(item, index) in domicilio.provincias" :key="index"
                        :value="item.Codigo"
                        v-text="item.Nombre"
                      )
                .row.form-group
                  .col-md-4
                    label(for='') Distrito
                    select(
                      v-model="domicilio.selectedDistrito"
                      @change='loadZonas'
                      id='domicilio-distrito'
                      class="form-control"
                      required
                    )
                      option(disabled value='') Seleccione
                      option(
                        v-for="(item, index) in domicilio.distritos" :key="index"
                        :value="item.Codigo"
                        v-text="item.Nombre"
                      )
                  .col-md-8
                    label(for='') Zona
                    select(
                      v-model="domicilio.selectedZona"
                      id='domicilio-zona'
                      class="form-control"
                      required
                    )
                      option(disabled value='') Seleccione
                      option(
                        v-for="(item, index) in domicilio.zonas" :key="index"
                        :value="item.Codigo"
                        v-text="item.Nombre"
                      )
                .row.form-group
                  .col-md-4
                    label(for='') Tipo Vía
                    select(
                      v-model="domicilio.selectedTipoVia"
                      @change='loadVias'
                      id='domicilio-tipovia'
                      class="form-control"
                      required
                    )
                      option(disabled value='') Seleccione
                      option(
                        v-for="(item, index) in domicilio.tipoVias" :key="index"
                        :value="item.Codigo"
                        v-text="item.Nombre"
                      )
                  .col-md-8
                    label(for='') Nombre de la vía
                    select(
                      v-model="domicilio.selectedVia"
                      id='domicilio-via'
                      class="form-control"
                      required
                    )
                      option(disabled value='') Seleccione
                      option(
                        v-for="(item, index) in domicilio.vias" :key="index"
                        :value="item.Codigo"
                        v-text="item.Nombre"
                      )
                .row
                  .col-md-3.form-group
                    label Número
                    input.form-control(v-model='domicilio.numeroDomicilio' type='text' maxlength='9')
                  .col-md-3
                    label Manzana
                    input.form-control(v-model='domicilio.numeroManzana' type='text' maxlength='5')
                  .col-md-3
                    label Lote
                    input.form-control(v-model='domicilio.numeroLote' type='text' maxlength='5')
                  .col-md-3
                    label Dpto
                    input.form-control(v-model='domicilio.numeroDepartamento' type='text' maxlength='5')
                br


                //- <small>Al darle clic declaro que he leido y acepto los <u class="text-danger btn-link">Términos y Condiciones</u></small>
                //- <div class="row" v-show="false">
                //-   <div class="col-md-12">
                //-     <div class="pretty p-default p-thick p-pulse">
                //-       <input v-model="aceptaTratamientoDatos" type="checkbox" class="form-check-input" id="exampleCheck1">
                //-       <div class="state p-danger-o">
                //-         <label class="form-check-label" for="exampleCheck1"></label>
                //-       </div>
                //-     </div>
                //-     <span for="">He leído y acepto la <u data-toggle="modal" data-target="#exampleModal" style="color: teal; cursor: pointer;">Política de tratamiento de datos personales</u>.</span>
                //-   </div>
                //- </div>

              //- ./ingreso de datos cuenta
              .row
                .col-md-4
                  button(type="submit" class="btn btn-danger btn-block") Siguiente


    //- Modal
    #modalMensajeStep3.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-dialog-centered(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body
            p {{ mensajeModal }}
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
import { log } from 'util';
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

const endPoint = process.env.VUE_APP_ROOT_API
const urlCajanet = process.env.VUE_APP_URL_CAJANETCMACHYO

export default {
  components: {
    Header,
    Footer,
    Steps,
  },
  data() {
    return {
      email: this.$store.state.datoUsuarioStep1.email,
      confirmEmail: '',
      checkedMoneda: '1',

      // ubigeo
      departamentos: [],
      provincias: [],
      agencias: [],
      selectedDepartamento: '',
      selectedProvincia: '',
      selectedAgencia: '',

      dataRemuneracion: {
        tipoEnvioEmpleador: 'consulta',
        ruc: '',
        razonSocial: '',

        // Response
        existeEmpleador: '0',
        codigoEmpleador: '',

        showRuc: true,
        showRazon: false,
        showBtnConsultaEmpleador: true,

        msgEmpleador: false,
      },

      showEmpleador: false,
      showDataCuenta: false,

      aceptaTratamientoDatos: true,

      mensajeModal: '',

      existeCliente: false,
      existeSUNAT: false,

      domicilio: {
        showDomicilio: false,
        // objetos
        provincias: [],
        distritos: [],
        zonas: [],
        tipoVias: [],
        vias: [],
        // seleccionados
        selectedDepartamento: '',
        selectedProvincia: '',
        selectedDistrito: '',
        selectedZona: '',
        selectedTipoVia: '',
        selectedVia: '',
        // inputs
        numeroDomicilio: '',
        numeroManzana: '',
        numeroLote: '',
        numeroDepartamento: '',
      },

      esCliente: sessionStorage.getItem('esCliente'),
    }
  },
  validations: {
    email: {
      required
    },
    confirmEmail: {
      sameAsEmail: sameAs('email')
    },
  },
  mounted() {
    if (sessionStorage.getItem('token')) {
      this.loadData()
    }
  },
  created() {
    if (!this.$route.query.id) {
      if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
        this.$router.push('/')
      }
    } else {      
      // Validando que la redirección venga del portal CAJANETCMACHYO
      let previousUrl = document.referrer
      if (previousUrl.substring(0, urlCajanet.length) != urlCajanet) {
        this.$router.push('/')
      }
      this.consultaCliente()
    }

  },
  updated() {
    if (!sessionStorage.getItem('token') && this.$route.path !== '/') {
      this.$router.push('/')
    }
  },
  methods: {
    loadProvinciasAll() {
      this.$loading(true)
      this.domicilio.selectedProvincia = ''
      this.domicilio.selectedDistrito = ''
      this.domicilio.selectedZona = ''
      this.domicilio.selectedVia = ''
      this.domicilio.distritos = []
      this.domicilio.zonas = []
      this.domicilio.vias = []
      document.getElementById('domicilio-provincia').disabled = false

      axios
        .get(endPoint + '/api/ubigeo/listarprovinciatodos?idDepartamento=' + this.domicilio.selectedDepartamento,
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.domicilio.provincias = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    loadDistritos() {
      this.$loading(true)
      this.domicilio.selectedDistrito = ''
      document.getElementById('domicilio-distrito').disabled = false

      axios
        .get(endPoint + '/api/ubigeo/listardistrito?idDepartamento=' + this.domicilio.selectedDepartamento +
                                                  '&idProvincia=' + this.domicilio.selectedProvincia,
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.domicilio.distritos = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    loadZonas() {
      this.$loading(true)
      this.domicilio.selectedZona = ''
      document.getElementById('domicilio-zona').disabled = false

      axios
        .get(endPoint + '/api/ubigeo/listarzona?idDepartamento=' + this.domicilio.selectedDepartamento +
                                                  '&idProvincia=' + this.domicilio.selectedProvincia +
                                                  '&idDistrito=' + this.domicilio.selectedDistrito,
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.domicilio.zonas = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    loadTipoVias() {
      this.$loading(true)

      axios
        .get(endPoint + '/api/ubigeo/listartipovia',
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.domicilio.tipoVias = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    loadVias() {
      this.$loading(true)
      this.domicilio.selectedVia = ''
      this.domicilio.vias = []

      axios
        .get(endPoint + '/api/ubigeo/listarvia?idDepartamento=' + this.domicilio.selectedDepartamento +
                                                  '&idProvincia=' + this.domicilio.selectedProvincia +
                                                  '&idTipoVia=' + this.domicilio.selectedTipoVia,
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.domicilio.vias = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    /* Carga de datos iniciales
    ----------------------------*/
    loadData() {
      // Mostrando inputs necesarios para cuenta de remuneraciones
      let tipoCuenta = this.$route.params.cuenta
      if (tipoCuenta === 'cuenta-remuneracion' || tipoCuenta ==='cuenta-cts') {
        this.showEmpleador = true
      } else {
        this.showDataCuenta = true
      }

      // validacion de domicilio solo cliente nuevo
      if (this.esCliente == "false") {
        this.domicilio.showDomicilio = true
      }

      // Cargando lista de departamentos
      this.loadDepartamentos()
      // Cargando tipos de vias
      this.loadTipoVias  ()
    },

    /* Carga de datos iniciales
    ----------------------------*/
    loadDepartamentos() {
      this.$loading(true)
      document.getElementById('listaProvincia').disabled = true
      document.getElementById('listaAgencia').disabled = true


      // domicilio inhabilitar
      // validacion de domicilio solo cliente nuevo
      // if (this.esCliente == "false") {
      //   document.getElementById('domicilio-provincia').disabled = true
      //   document.getElementById('domicilio-distrito').disabled = true
      //   document.getElementById('domicilio-zona').disabled = true
      // }

      axios
        .get(endPoint + '/api/ubigeo/listardepartamento',
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.departamentos = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    loadProvincias() {
      this.$loading(true)
      this.selectedProvincia = ''
      this.selectedAgencia = ''
      this.agencias = []

      document.getElementById('listaProvincia').disabled = false

      axios
        .get(endPoint + '/api/ubigeo/listarprovincia?idDepartamento=' + this.selectedDepartamento,
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.provincias = response.data
        })
        .finally( () => (this.$loading(false)) )
    },
    loadAgencias() {
      this.$loading(true)
      this.selectedAgencia = ''
      document.getElementById('listaAgencia').disabled = false

      axios
        .get(endPoint + '/api/ubigeo/listaragencia?idDepartamento=' + this.selectedDepartamento +
                                                  '&idProvincia=' + this.selectedProvincia,
          { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          this.agencias = response.data
        })
        .finally( () => (this.$loading(false)) )
    },

    /* ENVIO DE FORMULARIOS
    ------------------------- */
    sendFormCaracteristicaCuenta() {
      // Valida email iguales
      if (this.email !== this.confirmEmail) {
        alert('Los email ingresados no son iguales, por favor verificar.')
        return
      }

      // Nombre de oficina
      let age = this.selectedAgencia
      let agenciaSeleccionada = this.agencias.filter(function(agencia) {
        return agencia.Codigo == age
      })


      // Almacenar los datos ingresados en el store
      let dataUsuario = {
        emailEnvio: this.email,
        monedaApertura: this.checkedMoneda,
        tipoCuenta: this.$route.params.cuenta,
        codigoEmpleador: this.dataRemuneracion.codigoEmpleador,
        ruc: this.dataRemuneracion.ruc,
        razonSocial: this.dataRemuneracion.razonSocial,
        oficina: this.selectedAgencia,
        nombreOficina: agenciaSeleccionada[0].Descripcion,
        // Domicilio
        codigoDepartamento: this.domicilio.selectedDepartamento,
        codigoProvincia: this.domicilio.selectedProvincia,
        codigoDistrito: this.domicilio.selectedDistrito,
        codigoZona: this.domicilio.selectedZona,
        codigoTipoVia: this.domicilio.selectedTipoVia,
        codigoVia: this.domicilio.selectedVia,
        numeroDomicilio: this.domicilio.numeroDomicilio,
        numeroManzana: this.domicilio.numeroManzana,
        numeroLote: this.domicilio.numeroLote,
        numeroDepartamento: this.domicilio.numeroDepartamento,
      }
      this.$store.commit('setDataUsuarioStep3', dataUsuario)

      // Se redirecciona al paso 4
      this.$router.replace({ name: 'step4' })
    },
    consultaEmpleador() {
      this.$loading(true)

      if (this.dataRemuneracion.tipoEnvioEmpleador != 'registrar') {
        axios
        .get(endPoint + '/api/empleador/verificar?numeroDocumento=' + this.dataRemuneracion.ruc,
           { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          let res = response.data

          if (res.ExisteEmpleador === true) {
            this.dataRemuneracion.existeEmpleador = res.ExisteEmpleador
            this.dataRemuneracion.codigoEmpleador = res.Codigo
            this.dataRemuneracion.razonSocial = res.Nombre
            this.dataRemuneracion.showRazon = true
            this.dataRemuneracion.showBtnConsultaEmpleador = false

            this.showDataCuenta = true
            document.getElementById('rucempleador').disabled = true
            document.getElementById('razonsocial').disabled = true
          } else if (res.ExisteSUNAT === false && res.ExisteCliente === false) {
            // no permitir registrar
          } else {
            document.getElementById('rucempleador').disabled = true
            document.getElementById('razonsocial').disabled = true
            this.existeCliente = res.ExisteCliente
            this.existeSUNAT = res.ExisteSUNAT
            this.dataRemuneracion.razonSocial = res.Nombre
            this.dataRemuneracion.msgEmpleador = true
            this.dataRemuneracion.showRazon = true
            this.dataRemuneracion.tipoEnvioEmpleador = 'registrar'
          }


        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            
            this.mensajeModal = error.response.data.MensajeResponse
            $('#modalMensajeStep3').modal()

          }
        })
        .finally( () => (this.$loading(false)))
      } else {
        axios
        .post(endPoint + '/api/empleador/registrar', {
          NumeroRUC: this.dataRemuneracion.ruc,
          Nombre: this.dataRemuneracion.razonSocial,
          ExisteCliente: this.existeCliente,
          ExisteSUNAT: this.existeSUNAT,
        }, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then(response => {
          if (response.data.ExisteEmpleador == 1) {
            this.dataRemuneracion.existeEmpleador = response.data.ExisteEmpleador
            this.dataRemuneracion.codigoEmpleador = response.data.Codigo
            this.dataRemuneracion.razonSocial = response.data.Nombre
            // this.dataRemuneracion.showRazon = true
            this.dataRemuneracion.showBtnConsultaEmpleador = false

            this.dataRemuneracion.msgEmpleador = false

            this.showDataCuenta = true
          }
        })
        .finally( () => (this.$loading(false)))
      }


    },

    // Cliente desde CAJANET
    consultaCliente() {
      this.$loading(true)
      axios
        .post(process.env.VUE_APP_ROOT_API + '/api/login/authenticate', {
          NumeroDocumento: this.$route.query.id,
          Email: '',
          OperadorMovil: '',
          NumeroCelular: '',
          PoliticaTratamientoDatos: '',
        })
        .then(response => {
          let res = response.data

          // Asignaciones a sessionStorage
          if (res.EsCliente === true) {
            sessionStorage.setItem('token', res.Token)
            sessionStorage.setItem('document', res.NumeroDocumento)
            sessionStorage.setItem('esCliente', res.EsCliente)
            // sessionStorage.setItem('autDat', this.aceptaTratamientoDatos)
            this.$store.commit('setToken', res.Token)
            this.loadData()
          } else {
            this.$router.replace('/')
          }

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
// Estilos radio button
$bg: #dc3545;
$fg: lighten($bg,5%);
$borderWidth: 3px;

.radio-group {
  border: solid $borderWidth $fg;
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;

  input[type=radio] {
    position: absolute;
    visibility: hidden;
    display: none;
  }

  label {
    color: lighten($bg,10%);
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
    margin: 0;
  }

  input[type=radio]:checked + label{
    color: lighten($bg,60%);
    background: $fg;
  }


  label + input[type=radio] + label {
    border-left: solid $borderWidth $fg;
  }
}
</style>