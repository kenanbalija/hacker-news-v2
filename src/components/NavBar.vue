<template>
<section>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <section class="container">
      <div class="navbar-brand">

        <router-link class="navbar-item" to="/">
          <img src="../assets/logo.png">
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span v-for="value in [1,2,3]" aria-hidden="true" :key="value + '_span'" />
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item router-logo" to="/">
              Hacker News
          </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">

            <transition-group name="fade">
              <span class="clear-news-filter" v-show="newsFilter.length" 
                  key="transition-icon">
                <font-awesome-icon 
                  icon="times" 
                  @click="clearNewsFilter"/>
              </span>

              <input class="search-filter"
                type="text"
                ref="searchInput"
                v-show="searchOn"
                @keyup="activateNewsFilter"
                v-model="newsFilter"
                key="transition-input">

            </transition-group>

            <font-awesome-icon icon="search" class="search-filter-toggle" @click="toggleSearch"/>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-item">
              <font-awesome-icon icon="user-tag" />
            </a>

            <div class="navbar-dropdown">
              <font-awesome-icon class="fa-caret-up" icon="caret-up" />

              <template v-for="(link, index) in userLinks">
                <a  :key="link.name" class="navbar-item" >
                  {{ link.name }}
                </a>
                <hr class="navbar-divider" v-if="index == 2" :key="link.name +'_hr'">
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </nav>
  <sub-nav />

</section>

</template>

<script>
import SubNav from '@/components/SubNav.vue'
export default {
  name: 'NavBar',
  components: {
    SubNav,
  },
  data() {
    return {
      searchOn: false,
      userLinks: [
        { name: 'Submit' },{ name: 'Favourites' }, { name: 'Threads' }, { name: 'Settings' },
        { name: 'Sign out'}
      ],
      newsFilter: '',
    }
  },
  methods: {
    toggleSearch() {
      if (this.searchOn) {
        return this.searchOn = false 
       }
       this.searchOn = true; 

       this.$nextTick(() => {
         this.$refs.searchInput.focus();
       })
    },
    activateNewsFilter() {
      this.$root.$emit('search-filter', this.newsFilter);
    },
    clearNewsFilter() {
      this.newsFilter = '';
      this.$root.$emit('search-filter', this.newsFilter);
    }
  }
}
</script>