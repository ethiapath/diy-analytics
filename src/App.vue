<template>
  <div id="app">
    <h1>Analytics for www.accordersaguitare.com</h1>
    <p>Parsing <a href="https://github.com/maxime-michel/netlify-analytics">netlify-analytics</a> from data store type <tt>jsonbox.io</tt> with id <tt>box_ddae612d6b46739bd634</tt></p>
    <TotalViewsPerDay msg="Welcome to Your Vue.js App"/>
    <TopPages msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TotalViewsPerDay from './components/TotalViewsPerDay.vue'
import TopPages from './components/TopPages.vue'

export default {
  name: 'App',
  components: {
    TotalViewsPerDay,
    TopPages
  }
}
</script>

<style>
#app {
  width: 80%;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
