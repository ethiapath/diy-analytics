<template>
  <div id="app">
    <h1>Analytics for www.accordersaguitare.com</h1>
    <p>Parsing <a href="https://github.com/maxime-michel/diy-analytics">DIY Analytics</a> from data store type <tt>jsonbox.io</tt> with id <tt>box_ddae612d6b46739bd634</tt></p>
    <TotalViewsPerDay :data="data.totalViewsPerDay"/>
    <TopPages :data="data.topPages"/>
  </div>
</template>

<script>
import TotalViewsPerDay from './components/TotalViewsPerDay.vue'
import TopPages from './components/TopPages.vue'

let totalViewsPerDayMockData = [];
let visits = 10;
for (let i = 1; i < 366; i++) {
  visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  totalViewsPerDayMockData.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
}

let topPagesMockData = [
    {
      "network": "Facebook",
      "MAU": 2255250000
    },
    {
      "network": "Google+",
      "MAU": 430000000
    },
    {
      "network": "Instagram",
      "MAU": 1000000000
    },
    {
      "network": "Pinterest",
      "MAU": 246500000
    },
    {
      "network": "Reddit",
      "MAU": 355000000
    },
    {
      "network": "TikTok",
      "MAU": 500000000
    },
    {
      "network": "Tumblr",
      "MAU": 624000000
    },
    {
      "network": "Twitter",
      "MAU": 329500000
    },
    {
      "network": "WeChat",
      "MAU": 1000000000
    },
    {
      "network": "Weibo",
      "MAU": 431000000
    },
    {
      "network": "Whatsapp",
      "MAU": 1433333333
    },
    {
      "network": "YouTube",
      "MAU": 1900000000
  }
]

export default {
  name: 'App',
  components: {
    TotalViewsPerDay,
    TopPages
  },
  data() {
    return {
      data: {
        totalViewsPerDay: totalViewsPerDayMockData,
        topPages: topPagesMockData
      }
    }
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
