<template>
  <div class="search-box-wrapper flex column">
    <section class="search-box-container flex justify-center align-center">
      <section class="search-box">
        <input
          type="text"
          v-model="searchTxt"
          @input="onSearch"
          placeholder="City"
          ref="elSearch"
        />
      </section>
    </section>
    <section class="results-container" v-if="this.isResultsModalOn">
      <ul class="search-results-list">
        <li
          v-for="place in places"
          :key="place.Key"
          :place="place"
          @click="onSelectPlace(place)"
        >
          <div class="city-list-item">
            <p>
              {{ `${place.LocalizedName}, ${place.Country.LocalizedName}` }}
            </p>
          </div>
        </li>
      </ul>
    </section>
    <div
      class="screen"
      v-bind:class="{ open: this.isResultsModalOn }"
      @click="onToggleResultsModal"
    ></div>
  </div>
</template>

<script>
export default {
  name: "cities-search",
  props: ["places"],
  data() {
    return {
      searchTxt: "",
      isResultsModalOn: false,
    };
  },
  mounted() {
    const { elSearch } = this.$refs;
    elSearch.focus();
  },
  methods: {
    async onSearch() {
      this.isResultsModalOn = true;
      this.$emit("setPlacesSearch", this.searchTxt);
    },
    onSelectPlace(place) {
      this.$emit("selectCity", place);
      this.searchTxt = "";
    },
    onToggleResultsModal() {
      this.isResultsModalOn = !this.isResultsModalOn;
    },
  },
  computed: {},
  watch: {
    searchTxt() {
      if (this.searchTxt === "") this.isResultsModalOn = false;
    },
  },
};
</script>
