<template>
<header>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <section class="navbar__container">
      <div class="navbar__brand">

        <router-link class="navbar__link" to="/">
          <img class="site-logo" src="../assets/logo.png">
        </router-link>

        <a role="button" class="navbar__burger">
          <span v-for="value in [1,2,3]" aria-hidden="true" :key="value + '_span'" />
        </a>
      </div>

      <div class="navbar__menu">
        <section class="navbar__start">
          <router-link class="navbar__start__link" to="/">
              Hacker News
          </router-link>
        </section>

        <section class="navbar__end">
          <div class="navbar__end__item navbar__filter">

            <transition-group name="fade">
              <span class="navbar__filter__item" v-show="newsFilter.length" 
                  key="transition-icon">
                <font-awesome-icon icon="times" @click="clearNewsFilter"/>
              </span>

              <input
                type="text"
                ref="searchInput"
                v-show="searchOn"
                @keyup="activateNewsFilter"
                v-model="newsFilter"
                key="transition-input"
                class="navbar__filter__item navbar__filter__input">

            </transition-group>

            <font-awesome-icon icon="search" class="navbar__filter__item" @click="toggleSearch"/>
          </div>

          <div class="navbar__end__item navbar__profile">
            <a class="navbar__profile__icon">
              <font-awesome-icon icon="user" />
            </a>

            <div class="navbar__profile__dropdown">

              <font-awesome-icon class="dropdown__caret" icon="caret-up" />

              <template v-for="(link, index) in userLinks">
                <a  :key="link.name" class="dropdown__item" >
                  {{ link.name }}
                </a>
                <hr class="dropdown__divider" v-if="index == 2" :key="link.name +'_hr'">
              </template>
            </div>
          </div>
        </section>
      </div>
    </section>
  </nav>

  <sub-nav />

</header>

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