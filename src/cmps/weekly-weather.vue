<template>
  <div
    v-if="this.currCity"
    class="weather-box-container flex column align-center space-between"
    v-bind:class="{ dark: isDarkModeOn }"
  >
    <weather-box-top
      :dailyData="this.currCity.currentData"
      :city="this.currCity.city"
    />
    <weather-box-bottom :weeklyData="this.currCity.weeklyData" />
  </div>
  <div
    v-else
    class="weather-box-container flex column align-center space-between"
    v-bind:class="{ dark: isDarkModeOn }"
  >
    <data-error />
  </div>
</template>

<script>
import DataError from "./data-error.vue";
import WeatherBoxBottom from "./weather-box-bottom.vue";
import WeatherBoxTop from "./weather-box-top.vue";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    currCity() {
      return this.$store.getters.currCity;
    },
    isDarkModeOn() {
      return this.$store.getters.isDarkModeOn;
    },
  },
  watch: {},
  components: { WeatherBoxTop, WeatherBoxBottom, DataError },
};
</script,
    DataError>
