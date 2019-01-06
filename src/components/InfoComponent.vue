<template>
  <ul class="news-info">
    <li class="news-info__list">
      <font-awesome-icon icon="clock" />
      {{ getTimeAgo() }}
    </li>
    <li class="news-info__list">
      <font-awesome-icon icon="user" />
      {{ $parent.news[indx].by }}
    </li>
    <li class="news-info__list">
      <a class="news-info__list__anchor" :href="$parent.news[indx].url" target="_blank">
        <font-awesome-icon icon="link" />
        <template v-if="$parent.news[indx].url">
          {{ getDomain() }}
        </template>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    indx : ''
  },
  methods: {
    getTimeAgo() {
      return this.$parent.getTimeAgo(this.$parent.news[this.indx].time);
    },
    getDomain() {
      return this.$parent.getDomain(this.$parent.news[this.indx].url)
    },
  }
}
</script>
 