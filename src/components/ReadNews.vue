<template>
  <modal classes="block-modal" height="auto" :scrollable="true" name="read-news-modal" transition="fade"  @before-open="beforeOpen">
    
    <section class="block-modal__section">
      <button class="block-modal__section__close-button" @click="close">Close</button>
      <h1 class="block-modal__section__heading">
        {{ news.title }}
      </h1>
      <ul class="block-modal__section__list">
        <li class="list-item">
          <font-awesome-icon icon="clock" />
          {{ getTimeAgo(news.time) }}
        </li>
        <li class="list-item">
          <font-awesome-icon icon="user" />
          {{ news.by }}
          </li>
        <li class="list-item">
          <a class="list-item__anchor" :href="news.url" target="_blank">
            <font-awesome-icon icon="link" />
            <template v-if="news.url">
              {{ getDomain(news.url) }}
            </template>
          </a>
        </li>
      </ul>
      <section class="block-modal__section__actions">
        <button class="action-button">
          <font-awesome-icon icon="check" @click="vote"/>
          Vote
        </button>
        <button class="action-button" @click="rate">
          <font-awesome-icon icon="star" />
          Favorite
        </button>
        <button class="action-button" @click="share">
          <font-awesome-icon icon="share" />
          Share
        </button>
      </section>
    </section>

    <section class="block-modal__section">
      <iframe v-if="loaded" class="block-modal__section__iframe" :src="news.url"></iframe>
      <h2 class="block-modal__section__heading block-modal__section__heading--warn" v-else>
        Source does not allow their site to be seen through iframe.
        <br/>
        Please click <a :href="news.url" target="_blank">here</a> to visit!
      </h2>
    </section>


    <section class="block-modal__section">
      <section class="block-modal__section__comments-stats">
        <p class="comment-paragraph">
          <template v-if="news.kids">
            {{ news.kids.length }}
          </template>
          <template v-else>
            0
          </template>
        </p>
        <h1 class="comment-heading">COMMENTS</h1>
      </section>

      <section class="block-modal__section__actions">
        <button class="action-button action-button--wide">
          Join Thread
        </button>
        <button class="action-button action-button--wide" @click="rate">
          Next Thread
        </button>
      </section>

      <hr class="horizontal-rule">
    </section>
    
    <section class="block-modal__section" v-if="comments">
      <article class="block-modal__section__comments" v-for="comment in comments" :key="comment.id">
        <h1 class="comment-heading" v-html="comment.text" />
        
        <ul class="comment-list">
          <li class="comment-list__item">
            <font-awesome-icon icon="clock" />
            {{ getTimeAgo(comment.time) }}
          </li>
          <li class="comment-list__item">
            <font-awesome-icon icon="user" />
            {{ comment.by }}
          </li>
        </ul>

      </article>
    </section>
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
      loaded: true,
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
    },
  }
}
</script>
