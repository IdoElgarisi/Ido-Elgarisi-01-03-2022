 <template>
  <div class="weather-box-bottom flex column align-center">
    <div class="weather-headline-container">
      <p>{{ weeklyData.Headline.Text }}</p>
    </div>
    <div class="weekly-list-container flex align-center">
      <ul class="weekly-list flex space-between">
        <li
          class="flex column align-center space-between"
          v-for="dailyForecast in fiveDaysForecast"
          :key="dailyForecast.Date"
        >
          <div class="flex justify-center align-center">
            <div class="weather-icon">
              <!-- <img
                :src="require(`../assets/icons/${dailyForecast.Day.Icon}.svg`)"
                alt=""
              /> -->
              <img
                :src="
                  require(`../assets/icons/${
                    availableIcons.includes(dailyForecast.Day.Icon)
                      ? dailyForecast.Day.Icon
                      : 1
                  }.svg`)
                "
                alt=""
              />
            </div>
          </div>
          <div class="daily-list-item flex column align-center justify-center">
            <div>
              <h3>{{ dailyForecast.Temperature.Maximum.Value }}&deg;</h3>
            </div>
            <div>
              <p>
                {{ new Date(dailyForecast.Date).toString().slice(0, 3) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["weeklyData"],
  data() {
    return {
      weeklyPropsData: null,
      fiveDaysForecast: null,
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
    this.weeklyPropsData = this.weeklyData;
    this.fiveDaysForecast = this.weeklyData.DailyForecasts;
  },
  methods: {
    getImgUrl(iconNum) {
      return `../assets/icons/${iconNum}.svg`;
    },
  },
  computed: {},
  watch: {
    weeklyData(val, oldVal) {
      this.weeklyPropsData = this.weeklyData;
      this.fiveDaysForecast = this.weeklyData.DailyForecasts;
    },
  },
};
</script>