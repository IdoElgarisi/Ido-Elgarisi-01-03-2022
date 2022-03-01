<template>
  <div class="main-container">
    <div
      class="app-main flex justify-center column align-center"
      v-bind:class="{ dark: isDarkMode }"
    >
      <cities-search
        @selectCity="selectCity"
        @setPlacesSearch="getPlaces"
        :places="getsearchedCities"
      />
      <weekly-weather />
    </div>
  </div>
</template>
<script>
import CitiesSearch from "../cmps/search-box.vue";
import WeeklyWeather from "../cmps/weekly-weather.vue";

export default {
  data() {
    return {
      selectedPlace: null,
      isFavoriteCity: false,
    };
  },
  created() {},
  methods: {
    getPlaces(txt) {
      this.$store.dispatch({ type: "onSetSearchCities", txt });
    },
    selectCity(city) {
      this.$store.dispatch({ type: "loadCurrCity", city });
    },
    loadFavoritesList() {
      this.$store.dispatch({ type: "onGetFavoritesList" });
    },
  },
  computed: {
    currCity() {
      return this.$store.getters.currCity;
    },
    favoritesList() {
      return this.$store.getters.favoritesList;
    },
    getsearchedCities() {
      return this.$store.getters.searchedCities;
    },
    isDarkModeOn() {
      return this.$store.getters.isDarkModeOn;
    },
  },
  watch: {
    isDarkModeOn() {
      this.isDarkMode = this.isDarkModeOn;
    },
  },
  components: {
    WeeklyWeather,
    CitiesSearch,
  },
};
</script>
