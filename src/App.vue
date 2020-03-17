<template>
  <div id="flightright">
    <app-header />
  </div>
</template>

<script>

import appHeader from './components/appHeader'

export default {
  name: 'flightright',
  components: {
    appHeader
  }
}

</script>

<style lang="sass">
@import './assets/css/main.css';

#flightright
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

h2
  font-weight: 100
  padding-top: 5px

  strong
    color: var(--green)

</style>
