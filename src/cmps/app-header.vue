<template>
  <section class="app-header-container main-container">
    <header class="app-header flex align-center space-between">
      <div class="logo-container">
        <router-link to="/">
          <h1>Weather App</h1>
        </router-link>
      </div>
      <theme-toggle />
      <div class="nav-bar-container flex align-center">
        <nav class="nav-bar flex align-center space-between">
          <router-link to="/">Home</router-link>
          <router-link to="/favorites">Favorites</router-link>
        </nav>
      </div>
    </header>
  </section>
</template>

<script>
import ThemeToggle from "./theme-toggle.vue";
export default {
  data() {
    return {
      isDarkMode: true,
    };
  },
  components: { ThemeToggle },
  methods: {},
  computed: {
    isDarkModeOn() {
      return this.$store.getters.isDarkModeOn;
    },
  },
  watch: {
    isDarkModeOn() {
      this.isDarkMode = this.isDarkModeOn;
    },
  },
};
</script>
