<template>
  <modal classes="custom-modal" height="auto" :scrollable="true" name="read-news-modal" transition="fade"  @before-open="beforeOpen">
    <section class="container">
      <button class="close-button" @click="close">Close</button>
      <h2>
        {{ news.title }}
      </h2>
      <ul class="inline">
        <li>
          <font-awesome-icon icon="clock" />
          {{ getTimeAgo(news.time) }}
        </li>
        <li>
          <font-awesome-icon icon="user" />
          {{ news.by }}
          </li>
        <li>
          <a :href="news.url" target="_blank">
            <font-awesome-icon icon="link" />
            <template v-if="news.url">
              {{ getDomain(news.url) }}
            </template>
          </a>
        </li>
      </ul>
      <div class="action-buttons">
        <button class="btn">
          <font-awesome-icon icon="check" @click="vote"/>
          Vote
        </button>
        <button class="btn" @click="rate">
          <font-awesome-icon icon="star" />
          Favorite
        </button>
        <button class="btn" @click="share">
          <font-awesome-icon icon="share" />
          Share
        </button>
      </div>
    </section>
    <div class="container">
      <iframe class="news-iframe" :src="news.url"></iframe>
    </div>
    <div class="container">
      <div class="points-score inline">
        <div class="small">
        <p>
          <template v-if="news.kids">
            {{ news.kids.length }}
          </template>
          <template v-else>
            0
          </template>
        </p>
        <span>COMMENTS</span>
        </div>
      </div>
      <div class="action-buttons t-20">
        <button class="btn join-next">
          Join Thread
        </button>
        <button class="btn join-next" @click="rate">
          Next Thread
        </button>
      </div>
      <hr>
    </div>
    <div class="container comments" v-if="comments">
      <div v-for="comment in comments" :key="comment.id">
        <h1 v-html="comment.text" />
        <ul>
          <li>
            <font-awesome-icon icon="clock" />
            {{ getTimeAgo(comment.time) }}
          </li>
          <li>
            <font-awesome-icon icon="user" />
            {{ comment.by }}
          </li>
        </ul>
      </div>
      <hr>
    </div>
  </modal>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ReadNews',
  data() {
    return {
      news: {},
      comments: [],
    }
  },
  methods: {
    getComments() {
      if (this.news.kids) {
        for (let i of this.news.kids) {
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json?print=pretty')
          .then((response) => {
            this.comments.push(response.data);
          }, (error) => {
            // eslint-disable-next-line
            console.log(error);
          })
        }
      }
    },
    beforeOpen (event) {
      this.news = event.params.data;
      this.getComments();
    },
    close() {
      this.$modal.hide('read-news-modal');
    },
    getTimeAgo(epoch) {
      return this.$parent.getTimeAgo(epoch);
    },
    getDomain(url) {
      return this.$parent.getDomain(url);
    },
    vote() {
      //TODO: IMPLEMENT VOTE METHOD
    },
    rate() {
      //TODO: IMPLEMENT RATE METHOD
    },
    share() {
      //TODO: IMPLEMENT SHARE METHOD
    }
  },
}
</script>
