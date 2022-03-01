
'use strict';
import axios from 'axios';
const BASE_URL = 'https://dataservice.accuweather.com/'
const API_KEY = 'TgYtabzAjV5E1sLMVho1Tr7LHSC6h7tu'
// const API_KEY = 'IbVtembGIrtagwacXuqWSYzLVJJG1Y2n'
const LOCATIONS_URL = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=`
const CURRENT_WEATHER_URL1 = `${BASE_URL}currentconditions/v1/`;
const CURRENT_WEATHER_URL2 = `?apikey=${API_KEY}`;
const WEEKLY_WEATHER_URL = `${BASE_URL}forecasts/v1/daily/5day/`;
export default {
    getAutoPlaces,
    getDailyWeather,
    getWeeklyWeather
};

async function getAutoPlaces(txt) {
    let data = await axios.get(`${LOCATIONS_URL}${txt}`)
    return data.data
}

async function getDailyWeather(cityCode) {
    let data = await axios.get(`${CURRENT_WEATHER_URL1}${cityCode}${CURRENT_WEATHER_URL2}`)
    return data.data[0]
}
async function getWeeklyWeather(cityCode, isMetric = true) {
    let data = await axios.get(`${WEEKLY_WEATHER_URL}${cityCode}${CURRENT_WEATHER_URL2}&metric=${isMetric}`)
    return data.data
}

