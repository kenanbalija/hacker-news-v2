<template>
  <ul>
    <li>
      <font-awesome-icon icon="clock" />
      {{ getTimeAgo() }}
    </li>
    <li>
      <font-awesome-icon icon="user" />
      {{ $parent.news[index].by }}
      </li>
    <li>
      <a :href="$parent.news[index].url" target="_blank">
        <font-awesome-icon icon="link" />
        <template v-if="$parent.news[index].url">
          {{ getDomain() }}
        </template>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    index : ''
  },
  methods: {
    getTimeAgo() {
      return this.$parent.getTimeAgo(this.$parent.news[this.index].time);
    },
    getDomain() {
      return this.$parent.getDomain(this.$parent.news[this.index].url)
    },
  }
}
</script>
 