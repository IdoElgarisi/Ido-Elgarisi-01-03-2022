'use strict';
import { utils } from './utils.service';
export default {
    getFavoritesList,
    updateFavoritesList
};
async function getFavoritesList() {
    let data = await utils.loadFromStorage('favorites')
    if (!data) {
        data = []
        utils.saveToStorage('favorites', data)
    }
    return data
}
function updateFavoritesList(newList) {
    utils.saveToStorage('favorites', newList)
}