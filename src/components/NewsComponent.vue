<template>
  <section>
    <article class="page">
      
      <h1 class="page__heading">Latest News of Today</h1>

      <section v-if="filteredNews.length" class="page__container">

        <article v-for="(news, index) in filteredNews"
          :key="news.id"
          class="article"
          :class="{ 'article--border-bottom' : index != filteredNews.length}">

          <section class="article__section article__section--first-column">
            
              <div class="column column__points">
                <p class="column__paragraph">{{ news.score }}</p>
                <span class="column__title">POINTS</span>
              </div>

              <div class="column column__comments">
                <template v-if="news.kids">
                  <p class="column__paragraph">{{ news.kids.length }}</p>
                </template>
                <template v-else>
                  <p class="column__paragraph">0</p>
                </template>
                <span class="column__title">COMMENTS</span>
              </div>

          </section>

          <section class="article__section article__section--second-column">
            <div class="column">
              <p class="column__paragraph">{{ news.title }}</p>
              <info-component :indx="index"/>
            </div>
          </section>

          <section class="article__section article__section--third-column">
            <div class="column">
              <button class="column__button" @click="readMore(news)">Read More</button>
            </div>
          </section>

        </article>
      </section>
    </article>

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
