<template>
  <div class="dashboard flex space-between">
    <div class="flex column align-center">
      <div class="theme-toggle-container" @click="toggleDarkMode()">
        <input class="theme" type="checkbox" name="theme" />
        <label for="theme" class="switch">
          <span v-if="this.isDarkMode" class="switch__circle dark">
            <span class="switch__circle-inner checked"></span>
          </span>
          <span v-else class="switch__circle light">
            <span class="switch__circle-inner checked"></span>
          </span>
          <span v-if="this.isDarkMode" class="switch__left"></span>
          <span v-else class="switch__right"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import themeIcon from "../assets/icons/circle-half-stroke-solid.svg";
export default {
  name: "theme-toggle",
  data() {
    return {
      isDarkMode: true,
    };
  },
  mounted() {},
  methods: {
    // async onSearch() {
    //   this.isResultsModalOn = true;
    //   this.$emit("setPlacesSearch", this.searchTxt);
    // },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkModeOn;
      const darkMode = this.isDarkMode;
      this.$store.dispatch({ type: "onToggleDarkMode", darkMode });
    },
  },
  computed: {
    isDarkModeOn() {
      return this.$store.getters.isDarkModeOn;
    },
  },
  watch: {},
};
</script>
