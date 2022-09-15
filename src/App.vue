<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '~pretty-checkbox/src/pretty-checkbox.scss';



*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

label {
  color: #333;
}

.error {
  color: #e92a41;
}

.is-invalid {
  border: 1px solid #e92a41;
  border-radius: 5px;
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
