<template>
  <section class="sub-nav">
    <nav class="sub-nav__container">

        <ul class="sub-nav__container__list sub-nav__start">
          <li v-for="(filter, index) in filterType" :key="filter.name" class="sub-nav__list-item">
            <button class="sub-nav__list-item__button" 
              :class="{'sub-nav__list-item__button--active' : filter.isActive }" 
              @click="activateFilterType(index)">{{ filter.name }}
            </button>
          </li>
        </ul>

        <ul class="sub-nav__container__list sub-nav__end">
          <transition name="fade">
            <li v-if="timeActive" class="sub-nav__list-item">
              <button class="sub-nav__list-item__button" @click="clearFilterTime">
                <font-awesome-icon icon="times" />
              </button>
            </li>
          </transition>

          <li v-for="(filter, index) in filterTime" :key="filter.name" class="sub-nav__list-item">
            <button class="sub-nav__list-item__button" 
              :class="{'sub-nav__list-item__button--active' : filter.isActive }" 
              @click="activateFilterTime(index)">{{ filter.name }}</button>
          </li>
        </ul>
    </nav>
  </section>
</template>

<script>

export default {
  name: 'SubNav',

  data() {
    return {
      filterType: [
        { name : 'News', isActive: true, api: 'v0/newstories.json'},
        { name: 'Show', isActive: false, api: 'v0/showstories.json'},
        { name: 'Comments' , isActive: false, api: 'v0/newstories.json'},
        { name: 'Ask' , isActive: false, api: 'v0/askstories.json'},
        { name: 'Jobs', isActive: false, api: 'v0/jobstories.json'},
      ],
      filterTime: [
        { name : 'Today', isActive: false, epoch: 86400 }, // news.time
        { name: 'Yesterday', isActive: false, epoch: 86400*2 }, // news.time
        { name: 'Last Month' , isActive: false, epoch: Math.floor((new Date).getTime()/1000) } // news.time
      ],
      timeActive: false,
    }
  },
  methods: {
    activateFilterType(index) {
      if (this.filterType[index].isActive == false)
        this.$root.$emit('api-filter', this.filterType[index].api);
      this.activateFilter(this.filterType, index);
    },
    activateFilterTime(index) {
      this.activateFilter(this.filterTime, index);
      this.$root.$emit('time-filter', this.filterTime[index].epoch);
      this.timeActive = true;
    },
    clearFilterTime() {
      for (let i in this.filterTime) {
        this.filterTime[i].isActive = false;
      }
      this.$root.$emit('time-filter', (new Date).getTime());
      this.timeActive = false;
    },
    activateFilter(filterObj, index) {
      for (let i in filterObj) {
        let filter = filterObj[i];
        if (i == index) {
          filter.isActive = true;
        } else {
          filter.isActive = false;
        }
      }
    }
  }
}
</script>