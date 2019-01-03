<template>
  <div class="home">
    <news-component />
  </div>
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
