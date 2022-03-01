<template>
  <div class="main-container">
    <div class="favorites-page flex justify-center">
      <div
        v-if="this.favoritesList[0]"
        class="favorites-list-container flex align-center justify-center"
      >
        <ul class="favorites-list flex justify-center align-center">
          <li
            class="favorite-card flex column space-between"
            v-for="favoriteCard in favoritesList"
            :key="favoriteCard.city.Key"
          >
            <div class="flex justify-center align-center">
              <div class="weather-icon">
                <img :src="require(`../assets/icons/1.svg`)" alt="" />
              </div>
            </div>
            <div
              class="daily-list-item flex column align-center justify-center"
              v-if="favoriteCard.dailyWeather"
            >
              <div>
                <h3>
                  {{ favoriteCard.dailyWeather.Temperature.Metric.Value }} &deg;
                </h3>
              </div>
              <div>
                <p>{{ favoriteCard.city.LocalizedName }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        v-else
        class="favorites-list-container flex align-center justify-center"
      >
        <h2>No Favorites Cities To Show</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoritesCitiesList: [],
    };
  },
  async created() {
    await this.loadFavoritesList();
    await this.getFavoritesDailyWeather();
  },
  mounted() {},
  methods: {
    loadFavoritesList() {
      this.$store.dispatch({ type: "onGetFavoritesList" });
    },

    getFavoritesDailyWeather() {
      const favoriteCities = this.favoritesList;
      if (favoriteCities)
        this.$store.dispatch({
          type: "setFavoritesCitiesWeather",
          favoriteCities,
        });
    },
  },
  computed: {
    favoritesList() {
      return this.$store.getters.favoritesList;
    },
  },
};
</script>
