<template>
  <div id="app">
    <h1>DIY Analytics</h1>
    <p>From data store type <tt>jsonbox.io</tt> with id <tt>box_ddae612d6b46739bd634</tt></p>
    <TotalViewsPerDay :data="totalViewsPerDay" v-if="isLoaded"/>
    <TopPages :data="topPages" v-if="isLoaded"/>
  </div>
</template>

<script>
import TotalViewsPerDay from './components/TotalViewsPerDay.vue'
import TopPages from './components/TopPages.vue'

function prepareData(json) {
  const uniqueDates = [...new Set(json.map(visit => visit._createdOn.substring(0, 10)))];
  const totalsPerDate = new Map([...new Set(json)].map(
    x => [x._createdOn.substring(0, 10), json.filter(y => y._createdOn.substring(0, 10) === x._createdOn.substring(0, 10)).length]
  ));
  let totalViewsPerDay = [];
  uniqueDates.forEach((date) => totalViewsPerDay.push({"date": date, "value": totalsPerDate.get(date)}));

  const uniquePages = [...new Set(json.map(visit => visit.url))];
  const totalsPerPage = new Map([...new Set(json)].map(
    x => [x.url, json.filter(y => y.url === x.url).length]
  ));
  let topPages = [];
  uniquePages.forEach((page) => topPages.push({"page": page, "visits": totalsPerPage.get(page)}));

  return {topPages: topPages, totalViewsPerDay: totalViewsPerDay};
}

export default {
  name: 'App',
  components: {
    TotalViewsPerDay,
    TopPages
  },
  data() {
    return {
      totalViewsPerDay: null,
      topPages: null
    }
  },
  computed: {
    isLoaded: function() {
      if (this.topPages != null && this.totalViewsPerDay != null) {
        return true;
      }
      return false;
    }
  },
  mounted () {
    fetch('https://jsonbox.io/box_299daa0b08f7d40aadf3?limit=1000')
      .then(response => response.json())
      .then(json => {
        var data = prepareData(json);
        this.topPages = data.topPages;
        this.totalViewsPerDay = data.totalViewsPerDay;
      });
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
