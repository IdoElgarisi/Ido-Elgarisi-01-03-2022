<template>
  <div class="app" v-bind:class="{ dark: isDarkModeOn }">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header.vue";

export default {
  name: "root-cmp",
  data() {
    return {
      initialData: { Key: "215854", LocalizedName: "Tel Aviv" },
    };
  },
  async created() {
    this.loadInitialCity(this.initialData);
  },
  computed: {
    isDarkModeOn() {
      return this.$store.getters.isDarkModeOn;
    },
  },
  methods: {
    loadInitialCity(city) {
      this.$store.dispatch({ type: "loadCurrCity", city });
    },
  },
  watch: {},
  components: {
    appHeader,
  },
};
</script>
