<template>
  <section>
    <news-component />
  </section>
</template>

<script>
import NewsComponent from '@/components/NewsComponent.vue'

export default {
  name: 'home',
  components: {
    NewsComponent,
  }
}
</script>
