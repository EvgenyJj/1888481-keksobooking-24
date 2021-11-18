import {createCard} from './card.js';
import {getData} from './api.js';
import {makeInactive, makeActive} from './activation.js';
import {showAlert} from './utils.js';
import {setFiltersListener} from './filters.js';
makeInactive();

const MapDefault = {
  LAT: 35.67417,
  LNG: 139.75712,
  ZOOM: 13,
};

const  MainPin = {
  WIDTH: 52,
  HEIGHT: 52,
};
const Pin = {
  WIDTH: 40,
  HEIGHT: 40,

};

const AMOUNT = 10;

const address = document.querySelector('#address');
const mapCanvas = document.querySelector('.map__canvas');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MainPin.WIDTH, MainPin.HEIGHT],
  iconAnchor: [MainPin.WIDTH / 2, MainPin.HEIGHT],
});

const mainPinMarker = L.marker({
  lat: MapDefault.LAT,
  lng: MapDefault.LNG,
},
{
  draggable: true,
  icon: mainPinIcon,
},
);

const map = L.map(mapCanvas)
  .setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  },  MapDefault.ZOOM);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

export const setDefault = () => {
  mainPinMarker.setLatLng({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  });
  map.setView({
    lat: MapDefault.LAT,
    lng: MapDefault.LNG,
  }, MapDefault.ZOOM);
  map.closePopup();
  address.value = `${MapDefault.LAT}, ${MapDefault.LNG}`;
};

const setAddressValue = () => {
  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    const coordinateLat = coordinates.lat.toFixed(5);
    const coordinateLng = coordinates.lng.toFixed(5);
    address.value = `${coordinateLat}, ${coordinateLng}`;
  });
};

const createMarker = (point) => {
  const {lat, lng} = point.location;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [Pin.WIDTH, Pin.HEIGHT],
    iconAnchor: [Pin.WIDTH / 2, Pin.HEIGHT],
  });
  L.marker({lat, lng}, {icon}).addTo(markerGroup).bindPopup(createCard(point));
};

export const renderMarkers = (points) => points.forEach(createMarker);

export const clearMarkers = () => markerGroup.clearLayers();

const onDataLoad = (ads) => {
  renderMarkers(ads.slice(0, AMOUNT));
  setFiltersListener(ads);
};

const onDataFail = () => {
  showAlert('Ошибка загрузки данных!');
};
export const mapInitialization = () => {
  setDefault();
  map.whenReady(() => {
    makeActive();
    getData(onDataLoad, onDataFail);
  });
  mainPinMarker.addTo(map);
  setAddressValue();
};
