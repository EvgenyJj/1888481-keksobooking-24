import {renderMarkers, clearMarkers} from './map.js';
import {debounce} from './utils.js';

const AMOUNT = 10;
const VALUE_DEFAULT = 'any';

const priceFiltersRange = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');

const selectHousingType = ({offer}) => offer.type === housingType.value || housingType.value === VALUE_DEFAULT;

const selectHousingPrice = ({offer}) => {
  const offerPriceType = housingPrice.value;
  if (offerPriceType === VALUE_DEFAULT) {
    return true;
  }
  switch (offerPriceType) {
    case 'low':
      return offer.price > priceFiltersRange.low.min && offer.price < priceFiltersRange.low.max;
    case 'middle':
      return offer.price >= priceFiltersRange.middle.min && offer.price <=  priceFiltersRange.middle.max;
    case 'high':
      return offer.price > priceFiltersRange.high.min && offer.price < priceFiltersRange.high.max;
  }
};

const selectHousingRooms = ({offer}) => housingRooms.value === VALUE_DEFAULT || housingRooms.value === String(offer.rooms);

const selectHousingGuests = ({offer}) => housingGuests.value === VALUE_DEFAULT || housingGuests.value === String(offer.guests);

const selectHousingFeatures = ({offer}) => {
  const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures.length === 0) {
    return true;
  }
  if (!offer.features) {
    return false;
  }
  return Array.from(checkedFeatures).every((feature) => offer.features.includes(feature.value));
};

const markerFilters = (ads) => ads.filter((item) => (
  selectHousingType(item)
  && selectHousingPrice(item)
  && selectHousingRooms(item)
  && selectHousingGuests(item)
  && selectHousingFeatures(item)
));

const onFilterChange = (data) => {
  const filteredData = markerFilters(data);
  clearMarkers();
  renderMarkers(filteredData.slice(0, AMOUNT));
};

export const setFiltersListener = (ads) => {
  mapFilters.addEventListener('change', debounce(() => onFilterChange(ads)));
};
