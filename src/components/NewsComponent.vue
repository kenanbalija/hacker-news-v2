<template>
<section>
  <div class="all-news-container">
    <h1 class="has-text-centered">Latest News of Today</h1>
    <section v-if="filteredNews.length" class="container news-container">
      <div v-for="(news, index) in filteredNews"
        :key="news.id"
        class="columns" :class="{ 'bb-1' : index != filteredNews.length}">

        <div class="column is-one-quarter">
          <section class="columns">
            <div class="column points-score">
              <p>{{ news.score }}</p>
              <span>POINTS</span>
            </div>

            <div class="column points-score">
              <template v-if="news.kids">
                <p>{{ news.kids.length }}</p>
              </template>
              <template v-else>
                <p>0</p>
              </template>
              <span>COMMENTS</span>
            </div>
          </section>
        </div>

        <div class="column is-three-fifths news-data">
          <div>
            <p>{{ news.title }}</p>
            <ul>
              <info-component :index="index"/>
            </ul>
          </div>
        </div>

        <div class="column is-one-fifths">
          <div class="read-more">
            <button class="button" @click="readMore(news)">Read More</button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <read-news />
</section>
</template>

<script>2
import axios from 'axios'
import moment from 'moment';
import ReadNews from '@/components/ReadNews.vue'
import InfoComponent from '@/components/InfoComponent.vue'

export default {
  name: 'NewsComponent',
  components: {
    ReadNews,
    InfoComponent,
  },
  mounted() {
    this.getNews();
    this.$root.$on('search-filter', (e) => {
      this.filter = e;
    }) 
    this.$root.$on('api-filter', (e) => {
      this.apiType = e;
      this.reset();
    }) 
    this.$root.$on('time-filter', (e) => {
      this.timeFilter = e;
    }) 
    window.addEventListener("scroll", this.load);
  },
  data() {
    return {
      ids: [],
      startIndex: 0,
      incrementor: 50,
      news: [],
      filter : '',
      timeFilter: (new Date).getTime(),
      errors: [],
      baseApi: 'https://hacker-news.firebaseio.com/',
      apiType: 'v0/topstories.json'
    }
  },
  methods: {
    getNews: function () {
      let apiUrl = this.baseApi + this.apiType;
      axios.get(apiUrl)
      .then((response) => {
        this.ids = response.data;
        this.loadMoreNews();
      }, (error) => {
        this.errors.push(error);
      })
    },
    loadMoreNews() {
      let _this = this;

      if (this.startIndex >= this.ids.length)
        return;

      let endIndex = this.startIndex + this.incrementor;
      for (let i = this.startIndex; i < endIndex; i++) {
        this.startIndex ++;

        if (i >= this.ids.length)
          return;
          
        axios.get('https://hacker-news.firebaseio.com/v0/item/'+ _this.ids[i] +'.json')
        .then((response) => {
          _this.news.push(response.data);
          _this.resume();
        }, (error) => {
          _this.errors.push(error);
        })
      }
    },
    load() {
      if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        window.removeEventListener("scroll", this.load);
        this.loadMoreNews();
      }
    },
    resume() {
      if (this.news.length == this.startIndex) {
        window.addEventListener("scroll", this.load);
      }
    },
    reset() {
      this.ids = [],
      this.startIndex = 0,
      this.incrementor = 50,
      this.news = [],
      this.getNews();
    },
    getTimeAgo(epoch) {
      return moment.unix(epoch).fromNow();
    },
    getDomain(url) {
      let domain = (new URL(url)).hostname;
      return domain.replace('www.', '');
    },
    readMore(news) {
      this.$modal.show('read-news-modal', { data: news });
    }
  },
  computed: {
    filteredNews() {
      let filtered = this.news.filter(n => {
        let now = Math.floor((new Date).getTime() / 1000);
        if (now - n.time <= this.timeFilter) {
          return  n.title.toLowerCase().includes(this.filter.toLowerCase());
        } 
      })
      // eslint-disable-next-line
      return _.orderBy(filtered, (o)  => { return o.time; }, 'desc');
    }
  }
}
</script>
