import Vue from 'vue';
import Vuex from 'vuex';
import weatherService from '../services/weather.service';
import favoritesService from '../services/favorites.service';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    favoritesList: [],
    searchedCities: null,
    currCity: null,
    isDarkModeOn: true
  },

  getters: {
    currCity(state) {
      return state.currCity;
    },
    searchedCities(state) {
      return state.searchedCities
    },
    favoritesList(state) {
      return state.favoritesList;
    },
    isDarkModeOn(state) {
      return state.isDarkModeOn
    }
  },
  mutations: {
    setCurrCity(state, { newCity }) {
      state.currCity = newCity;
    },
    setSearchedCities(state, { searchedPlaces }) {
      state.searchedCities = searchedPlaces

    },
    setFavoritesList(state, { newList }) {
      state.favoritesList = newList
    },
    removeFavorite(state, { cityCode }) {
      const idx = state.favoritesList.findIndex(currCityCode => cityCode === currCityCode);
      state.favoritesList.splice(idx, 1);
      favoritesService.updateFavoritesList(state.favoritesList)
    },
    addFavorite(state, { favoriteCity }) {
      const { Key } = favoriteCity
      if (state.favoritesList?.length > 0) {
        const idx = state.favoritesList.findIndex(currCity => currCity.city.Key === Key);
        if (idx === -1) state.favoritesList.push({ city: favoriteCity, dailyWeather: null });
        else state.favoritesList.splice(idx, 1);
      } else state.favoritesList = [{ city: favoriteCity, dailyWeather: null }]
      favoritesService.updateFavoritesList(state.favoritesList)
    },
    toggleDarkMode(state, { darkMode }) {
      state.isDarkModeOn = darkMode
    }
  },
  actions: {
    async loadCurrCity(context, { city }) {
      const { Key, LocalizedName } = city
      const currCityWeather = await weatherService.getDailyWeather(city.Key);
      const weeklyCityWeather = await weatherService.getWeeklyWeather(city.Key);
      const { Temperature, WeatherIcon, WeatherText, IsDayTime } = currCityWeather
      const newCity = {
        city: { Key, LocalizedName },
        currentData: { Temperature, WeatherIcon, WeatherText, IsDayTime },
        weeklyData: { ...weeklyCityWeather }
      }
      context.commit({ type: 'setCurrCity', newCity });
    },
    async onSetSearchCities(context, { txt }) {
      try {
        const searchedPlaces = await weatherService.getAutoPlaces(txt)
        context.commit({ type: 'setSearchedCities', searchedPlaces });
      } catch (err) { }
    },
    async onGetFavoritesList(context) {
      try {
        let newList = await favoritesService.getFavoritesList()

        context.commit({ type: 'setFavoritesList', newList });
      } catch (err) { }
    },
    async addToFavoritesList(context, { favoriteCity }) {
      context.commit({ type: 'addFavorite', favoriteCity });
    },
    async removeFromFavoritesList(context, { cityCode }) {
      context.commit({ type: 'removeFavorite', cityCode });
    },
    async setFavoritesCitiesWeather(context, { favoriteCities }) {
      const newList = []
      await favoriteCities?.map(async (favoriteCity) => {
        const dailyWeather = await weatherService.getDailyWeather(favoriteCity.city.Key)
        newList.push({ city: { ...favoriteCity.city }, dailyWeather })
      })
      context.commit({ type: 'setFavoritesList', newList });
      favoritesService.updateFavoritesList(newList)
    },
    onToggleDarkMode(context, { darkMode }) {
      context.commit({ type: 'toggleDarkMode', darkMode });
    }
  },
  modules: {
  }
});
