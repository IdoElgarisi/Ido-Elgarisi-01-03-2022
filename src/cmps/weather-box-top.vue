<template>
  <div class="weather-box-top flex align-center space-between">
    <div class="weather-mini-box-left flex align-center space-between">
      <div class="mini-city-icon flex align-center justify-center">
        <img
          :src="
            require(`../assets/icons/${
              this.availableIcons.includes(this.dailyData.WeatherIcon)
                ? this.dailyData.WeatherIcon
                : 1
            }.svg`)
          "
          alt=""
        />
      </div>
      <div class="weather-mini-city">
        <p v-if="this.city" class="city-name">{{ this.city.LocalizedName }}</p>
        <p v-if="this.dailyData">
          {{ this.dailyData.Temperature.Metric.Value }}
          &deg;
        </p>
      </div>
    </div>
    <div class="weather-mini-box-right flex align-center">
      <div @click="onRemoveFavorite" v-if="this.isFavoriteCity">
        <p>Remove From Favorites</p>
      </div>
      <div v-else @click="onAddFavorite">
        <p>Add To Favorites</p>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../services/utils.service";
export default {
  props: ["city", "dailyData"],
  data() {
    return {
      isFavoriteCity: true,
      availableIcons: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "12",
        "13",
        "14",
        "18",
        "22",
        "34",
      ],
    };
  },
  created() {
    this.checkIfFavorite();
  },
  methods: {
    onAddFavorite() {
      const { Key, LocalizedName } = this.city;
      const favoriteCity = { Key, id: utils.makeId(), LocalizedName };
      this.$store.dispatch({ type: "addToFavoritesList", favoriteCity });
    },
    onRemoveFavorite() {
      const { Key, LocalizedName } = this.city;
      this.$store.dispatch({ type: "removeFromFavoritesList", Key });
    },
    checkIfFavorite() {
      if (this.favoritesList) {
        const isFavorite = this.favoritesList?.filter((favoriteCity) => {
          return favoriteCity.city.Key === this.city.Key;
        });
        isFavorite?.length
          ? (this.isFavoriteCity = true)
          : (this.isFavoriteCity = false);
      } else this.isFavoriteCity = false;
    },
  },
  computed: {
    favoritesList() {
      return this.$store.getters.favoritesList;
    },
  },
  watch: {
    favoritesList() {
      this.checkIfFavorite();
    },
    city() {
      this.checkIfFavorite();
    },
  },
};
</script>
