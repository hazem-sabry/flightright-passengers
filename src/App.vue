<template>
  <div id="flightright">
    <app-header />

    <main>
      <div class="container">

        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>

      </div>
    </main>
  </div>
</template>

<script>

import appHeader from './components/appHeader'

export default {
  name: 'flightright',
  data() {
    return {
      currentRoute: this.$router.currentRoute
    }
  },
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
  padding-bottom: 40px

  .container
    height: calc(100vh - 86px)
    width: 95vw
    margin: 120px auto 0
    overflow-x: hidden
    overflow-y: scroll
    max-width: 500px
    max-height: 600px
    box-shadow: 4px 4px 15px #eee
    border-radius: 10px

    @media screen and (max-height: 568px)
      margin: 100px auto 0

    &::-webkit-scrollbar
      width: 1px

    /* Track */
    &::-webkit-scrollbar-track
      background: #f1f1f1
      border-radius: 5px

    /* Handle */
    &::-webkit-scrollbar-thumb
      background: var(--green)
      border-radius: 5px

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover
      background: var(--green)


.fade-enter-active
  transition: all .2s linear

.fade-leave-active
  transition: all .2s linear

.fade-enter 
  transform: translateX(20px)
  opacity: 0

.fade-leave-to
  transform: translateX(-20px)
  opacity: 0
  
</style>
