<template>
  <div class="my-location flex column align-center justify-center">
    <button @click="getLoc">Get Loc</button>
  </div>
</template>

<script>
import weatherService from "../services/weather.service.js";
export default {
  name: "my-location",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getLoc() {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    },
    async success(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const cityData = await weatherService.getLocationCode(lat, lng);
      const city = { Key: cityData.Key, LocalizedName: cityData.LocalizedName };
      this.$store.dispatch({ type: "loadCurrCity", city });
    },
    error() {
      console.log("error");
    },
  },
  computed: {},
  watch: {},
};
</script>
