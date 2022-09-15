<template lang="pug">
  .div
    ul.step-process
      li(:class="[ item == '1' ? 'progres' : (item < '1' ? '' : 'done' ) ]")
        .item {{ item <= '1' ? '1' : '' }}
      li(:class="[ item == '2' ? 'progres' : (item < '2' ? '' : 'done' ) ]")
        .item {{ item <= '2' ? '2' : '' }}
      li(:class="[ item == '3' ? 'progres' : (item < '3' ? '' : 'done' ) ]")
        .item {{ item <= '3' ? '3' : '' }}
      li(:class="[ item == '4' ? 'progres' : (item < '4' ? '' : 'done' ) ]")
        .item {{ item <= '4' ? '4' : '' }}
    br
    .step-title
      h2 {{ nombreStep(item) }}
    br
    div(style={width: '100%', border: '1px solid #eee'})
    br
</template>

<script>
export default {
  name: 'Steps',
  props: {
    item: String
  },
  methods: {
    nombreStep(item) {
      let nombre = ''
      switch (item) {
        case '1':
          nombre = 'Registra tu solicitud'
          break;
        case '2':
          nombre = 'Validación de datos'
          break;
        case '3':
          nombre = 'Detalle de la cuenta'
          break;
        case '4':
          nombre = 'Confirmación'
          break;
        default:
          break;
      }
      return nombre
    }
  }
}
</script>

<style lang="scss">
$color-done-border: rgb(147, 41, 30);
$color-done:  linear-gradient(to right,
              rgb(237, 33, 58),
              rgb(147, 41, 30));

.step-process {
  list-style: none;
  margin-top: 1em;
  padding: 0;
  display: flex;
  justify-content: center;
  justify-items: center;

  li:first-child {
    margin-left: 6.66667%;
  }
  li {
    display: inline-block;
    position: relative;
    height: 42px;
    box-sizing: content-box;

    line-height: 20px;
  }
  li:after {
    content: '';
    position: absolute;
    width: 100%;
    border-top: 2px solid #f0f0f0;
    top: calc(50% - 1px);

    z-index: 0;
    border-color: #f0f0f0;
  }
  li.done:after {
    border-color: $color-done-border;
  }

  li:last-child:after {
    border: none;
  }
}
.step-title {
  display: flex;
  justify-content: center;
  margin-left: 2.4em;
}
.item {
  font-size: 21px;
  width: 42px;
  height: 42px;
  border: 2px solid #f0f0f0;
  border-radius: 50%;
  background: #fff;
  position: relative;
  font-weight: 500;
  margin-right: 42px;
  z-index: 999;
  color: #f0f0f0;

  display: flex;
  justify-content: center;
  align-items: center;
}
.done .item {
  border-color: $color-done-border;
  background: $color-done;
}
.progres .item {
  border-color: $color-done-border;
  color: $color-done-border;
}

.done .item::before {
  content: '';
  display: block;
  width: 12px;
  height: 24px;
  border: solid white;
  border-width: 0 3px 3px 0;
  //-webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 4px;
  left: 12px;
} 
</style>