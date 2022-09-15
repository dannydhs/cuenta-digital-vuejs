import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Datos ingresados por el usuario en el paso 1
    datoUsuarioStep1: {
      numeroDocumento: '',
      email: '',
      operadorMovil: '',
      numeroCelular: '',
    },
    // Datos de respuesta de consulta a la api en el paso 1
    dataResponseStep1: {
      nombreCliente: '',
      numeroCelular: '',
      email: '',
      esCliente: sessionStorage.getItem('esCliente'),
    },
    // Eleccion de clave dinamica
    // dataUsuarioStep2: {
    //   pickedTipoEnvio: ''
    // },

    // Datos ingresados por el usuario en el paso 3
    dataUsuarioStep3: {
      emailEnvio: '',
      monedaApertura: '',
      tipoCuenta: '',
      codigoEmpleador: '',
      ruc: '',
      razonSocial: '',
      oficina: '',
      nombreOficina: '',
      // Domicilio
      codigoDepartamento: '',
      codigoProvincia: '',
      codigoDistrito: '',
      codigoZona: '',
      codigoTipoVia: '',
      codigoVia: '',
      numeroDomicilio: '',
      numeroManzana: '',
      numeroLote: '',
      numeroDepartamento: '',
    },

    // Datos de respuesta de la creación de cuenta del paso 4
    dataResponseStep4: {
      codigoCuenta: '',
      mensajeNotificacion: '',
    },

    tipoCuenta: '',
    token: '',
  },
  mutations: {
    setDataResponseStep1 (state, value) {
      state.dataResponseStep1.nombreCliente = value.nombreCliente
      state.dataResponseStep1.numeroCelular = value.numeroCelular
      state.dataResponseStep1.email = value.email
      state.dataResponseStep1.esCliente = value.esCliente
    },
    setToken (state, tokenValue) {
      state.token = tokenValue
    },
    setTipoCuenta (state, value) {
      state.tipoCuenta = value
    },
    setDatoUsuarioStep1 (state, value) {
      state.datoUsuarioStep1.numeroDocumento = value.numeroDocumento
      state.datoUsuarioStep1.email = value.email
      state.datoUsuarioStep1.operadorMovil = value.operadorMovil
      state.datoUsuarioStep1.numeroCelular = value.numeroCelular
    },

    setDataUsuarioStep3 (state, value) {
      state.dataUsuarioStep3.emailEnvio = value.emailEnvio
      state.dataUsuarioStep3.monedaApertura = value.monedaApertura
      state.dataUsuarioStep3.tipoCuenta = value.tipoCuenta
      state.dataUsuarioStep3.codigoEmpleador = value.codigoEmpleador
      state.dataUsuarioStep3.ruc = value.ruc
      state.dataUsuarioStep3.razonSocial = value.razonSocial
      state.dataUsuarioStep3.oficina = value.oficina
      state.dataUsuarioStep3.nombreOficina = value.nombreOficina
      // Domicilio
      state.dataUsuarioStep3.codigoDepartamento = value.codigoDepartamento
      state.dataUsuarioStep3.codigoProvincia = value.codigoProvincia
      state.dataUsuarioStep3.codigoDistrito = value.codigoDistrito
      state.dataUsuarioStep3.codigoZona = value.codigoZona
      state.dataUsuarioStep3.codigoTipoVia = value.codigoTipoVia
      state.dataUsuarioStep3.codigoVia = value.codigoVia
      state.dataUsuarioStep3.numeroDomicilio = value.numeroDomicilio
      state.dataUsuarioStep3.numeroManzana = value.numeroManzana
      state.dataUsuarioStep3.numeroLote = value.numeroLote
      state.dataUsuarioStep3.numeroDepartamento = value.numeroDepartamento
    },

    setCodigoCuenta (state, value) {
      state.dataResponseStep4.codigoCuenta = value.CodigoCuenta
      state.dataResponseStep4.mensajeNotificacion = value.Notificacion
    },
  },
  actions: {

  }
})
